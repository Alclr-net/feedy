import  z from "zod"
export const MessageValidationSchema = z.object({
    content: z.string().trim().min(1, {
        message: "Message content must be at least 1 character long",
      }),
})
