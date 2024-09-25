import { createTRPCProxyClient, createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
import { AppRouter } from "../../server/src/api"

const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: op => {
        return op.type === "subscription"
      },
      true: wsLink({
        client: createWSClient({
          url: "ws://localhost:3000/trpc",
        })
      }),
      false: httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    }),
  ]
})

document.addEventListener("click", () => {
  client.users.update.mutate({ userId: "1", name: "Kyle"})
})

async function main() {
  client.users.onUpdate.subscribe(undefined, {
    onData: id => {
      console.log("Updated", id)
    }
  })
}

main()