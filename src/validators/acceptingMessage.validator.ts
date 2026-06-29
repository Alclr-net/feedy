import z from "zod";
export const AcceptingMessageValidationSchema = z.object({
  isAcceptingMessage: z.boolean(),
});
