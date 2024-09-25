import { t } from "../trpc"

export const userRouter = t.router({
  getUser: t.procedure.query(() => {
    return { id: 1, name: "Kyle"};
  })
});