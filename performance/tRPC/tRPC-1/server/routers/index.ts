import { t } from "../trpc"

export const appRouter = t.router({
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