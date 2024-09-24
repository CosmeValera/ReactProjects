# tRPC
## 🧠 What?
tRPC is a framework for building type-safe APIs in TypeScript, enabling direct client-server communication without REST or GraphQL. It shares types between the client and server, ensuring both are always in sync, making development faster and more reliable.

## Backend

### Install tRPC server
```sh
npm i @trpc/server
```

### Express example
```ts
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
```

## Frontend

### Install tRPC client
```sh
npm i @trpc/client
```