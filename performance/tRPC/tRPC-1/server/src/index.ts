import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('BACKEND: Express + TypeScript Server');
});

app.get('/user', (req, res) => {
  res.send('BACKEND: User');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
