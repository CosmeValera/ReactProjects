# TRPC
## 🧠 What?
[tRPC](https://trpc.io/docs/quickstart) is a framework for building type-safe APIs in TypeScript, enabling direct client-server communication without REST or GraphQL. It shares types between the client and server, ensuring both are always in sync, making development faster and more reliable.

## Backend

### Install tRPC server
```sh
npm i @trpc/server
```

### Server code:
```ts
import express from 'express';
import cors from 'cors';
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

app.use(cors({ origin: "*" }))

app.use("/trpc", createExpressMiddleware({ router: appRouter }))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export type AppRouter = typeof appRouter
```

## Frontend

### Install tRPC client
```sh
npm i @trpc/client
```

### Client code:
```ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/src/index"

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({
    url: "http://localhost:3000/trpc"
  })]
})

async function main() {
  const result = await client.sayHi.query()
  console.log(result)
}

main()
```

## Resources
### Video
> Web Dev Simplified [VIDEO](https://www.youtube.com/watch?v=UfUbBWIFdJs)

#### Start from Scratch

> Frontend: Use Vite
> 
> Backend:
> 
> `package.json`: 
> ```sh
> "scripts": {
>    "start": "npx tsx --watch src/index.ts"
>  },
> ```