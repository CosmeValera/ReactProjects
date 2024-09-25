import { t } from "../trpc";
import { z } from "zod";

const userProcedure = t.procedure.input(z.object({ userId: z.string()}));

export const userRouter = t.router({
  get: userProcedure.query(({ input }) => {
    return { id: input.userId, name: "Kale"};
  }),
  update: userProcedure.input(z.object({ name: z.string() })).mutation(({input}) => {
    console.log(`Updating user ${input.userId} to have the name ${input.name}`)
    return { id: input.userId, name: input.name}
  })
});