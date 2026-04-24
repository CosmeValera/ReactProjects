import http from 'http';
import express from 'express';
import cors from 'cors';
import { initDB, Todo } from './db';

const app = express();
app.use(express.json());
// In k8s, the frontend and backend are on the same domain via Ingress
// so no CORS headers needed — but keep them for local dev
app.use(cors());

// health check endpoint (important for k8s liveness/readiness probes)
app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));

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

async function start() {
  await initDB();
  http.createServer(app).listen(3000, () => {
    console.log('Backend listening on http://0.0.0.0:3000');
  });
}
start().catch(console.error);