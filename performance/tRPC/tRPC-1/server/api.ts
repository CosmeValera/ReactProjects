import express from "express"
import cors from "cors"

const app = express();
app.use(cors({ origin: "http://localhost:5173"}))

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
