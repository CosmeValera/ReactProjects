import express from 'express';
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const app = express();
const port = 3000;

const t = initTRPC.create();

const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hi";
  }),
  logToServer: t.procedure.input(v => {
    if (typeof v === "string") {
      return v;
    }

    throw new Error("Invalid input: Expected string")
  }).mutation(req => {
    console.log("Client says: ", req.input);
    return true;
  })
});

app.use("/trpc", createExpressMiddleware({ router: appRouter }))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export type AppRouter = typeof appRouter