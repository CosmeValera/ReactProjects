import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/src/api"

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({
    url: "http://localhost:3000/trpc",
    headers: {
      Authorization: "TOKEN"
    }
  })]
})

async function main() {
  const result = await client.secretData.query()
  console.log(result)
}

main()