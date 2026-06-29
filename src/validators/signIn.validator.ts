import z from "zod";
export const SignInValidationSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, { message: "Identifier must be at least 3 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Insure that your Password fullfills all the below requirements.",
      }
    ),
});
