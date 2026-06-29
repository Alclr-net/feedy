import z from "zod";

export const UsernameValidationSchema = z.object({
    username: z
        .string()
        .trim()
        .regex(/^[a-z0-9]*$/, {
            message: "Hey! man you need to provide username in lowercase.",
        })
        .min(3, { message: "Username must be at least 3 characters long" })
})