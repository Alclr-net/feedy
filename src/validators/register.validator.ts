import z from "zod";
export const AuthValidationSchema = z.object({
  username: z
    .string()
    .trim()
    .regex(/^[a-z0-9]*$/, {
      message: "Hey! man you need to provide username in lowercase.",
    })
    .min(3, { message: "Username must be at least 3 characters long" })
    .optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }).regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Insure that your Password must follow all the below criteria.",
      }
    ),
    avatar: z.string().url({ message: "Invalid avatar URL" }).optional(),
});
