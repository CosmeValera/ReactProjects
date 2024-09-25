import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/src/api"

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({
    url: "http://localhost:3000/trpc"
  })]
})

async function main() {
  const result = await client.users.update.mutate({userId: "1234", name: "Aska"})
  console.log(result)
}

main()