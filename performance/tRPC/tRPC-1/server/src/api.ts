import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { mergedRouters } from '../routers';

const app = express();
const port = 3000;

app.use(cors({ origin: "*" }))

app.use("/trpc", createExpressMiddleware({ router: mergedRouters }))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export type AppRouter = typeof mergedRouters