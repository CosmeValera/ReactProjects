import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext } from "./context";

export const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();