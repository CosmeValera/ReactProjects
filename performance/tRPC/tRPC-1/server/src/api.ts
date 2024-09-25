import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from '../routers';
import { createContext } from '../context';

const app = express();
const port = 3000;

app.use(cors({ origin: "*" }))

app.use("/trpc", createExpressMiddleware({ 
  router: appRouter,
  createContext 
}))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export type AppRouter = typeof appRouter