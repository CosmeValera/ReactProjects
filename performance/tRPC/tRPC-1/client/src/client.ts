import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/src/index"

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({
    url: "http://localhost:3000/trpc"
  })]
})

async function main() {
  const result = await client.logToServer.mutate("Hi from client")
  console.log(result)
  
}

main()