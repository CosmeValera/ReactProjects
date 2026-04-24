import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { initDB, Todo } from './db';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://localhost:5173' }));  // Vite dev server

// ── Routes ──────────────────────────────────────────────────────────────────

app.get('/api/todos', async (_req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });
  const todo = await Todo.create({ text });
  res.status(201).json(todo);
});

app.patch('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ error: 'not found' });
  await todo.update({ done: !todo.done });
  res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ error: 'not found' });
  await todo.destroy();
  res.status(204).send();
});

// ── TLS setup ────────────────────────────────────────────────────────────────

async function startServer() {
  await initDB();

  const certsDir = path.join(__dirname, '..', '..', 'certs');

  // Load certificate + private key
  const tlsOptions = {
    key:  fs.readFileSync(path.join(certsDir, 'server.key')),
    cert: fs.readFileSync(path.join(certsDir, 'server.crt')),
    // If using a CA chain (optional for clients to verify):
    // ca: fs.readFileSync(path.join(certsDir, 'ca.crt')),
  };

  // HTTPS server on 3443
  const httpsServer = https.createServer(tlsOptions, app);
  httpsServer.listen(3443, () => {
    console.log('🔒 HTTPS server running at https://localhost:3443');
  });

  // Optional: HTTP → HTTPS redirect on 3080
  const httpApp = express();
  httpApp.use((req, res) => {
    res.redirect(301, `https://${req.hostname}:3443${req.url}`);
  });
  http.createServer(httpApp).listen(3080, () => {
    console.log('↪️  HTTP redirect running at http://localhost:3080');
  });
}

startServer().catch(console.error);