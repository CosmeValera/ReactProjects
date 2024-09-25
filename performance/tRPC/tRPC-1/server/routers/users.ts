import { t } from "../trpc";
import { z } from "zod";
import { observable } from "@trpc/server/observable"
import { EventEmitter } from "stream";

const userProcedure = t.procedure.input(z.object({ userId: z.string()}));
const eventEmitter = new EventEmitter();

export const userRouter = t.router({
  get: userProcedure.query(({ input }) => {
    return { id: input.userId, name: "Kale"};
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ name: z.string(), id: z.string() }))
    .mutation(({input, ctx}) => {
      console.log(`Updating user ${input.userId} to have the name ${input.name}`)
      eventEmitter.emit("update", input.userId)
      return { id: input.userId, name: input.name, password: "123"}
    }),
  onUpdate: t.procedure.subscription(() => {
    return observable<string>(emit => {
      eventEmitter.on("update", emit.next)

      return () => {
        eventEmitter.off("update", emit.next)
      }
    })
  })
});