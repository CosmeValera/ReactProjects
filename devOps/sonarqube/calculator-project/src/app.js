import express from 'express';
import { add, subtract } from './calculator.js';

const app = express();
app.use(express.json());

app.get('/add/:a/:b', (req, res) => {
  const result = add(Number(req.params.a), Number(req.params.b));
  res.json({ result });
});

app.get('/subtract/:a/:b', (req, res) => {
  const result = subtract(Number(req.params.a), Number(req.params.b));
  res.json({ result });
});

export default app;
