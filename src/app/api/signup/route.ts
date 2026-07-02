import dbConnect from "@/lib/dbConnect";
import {
  searchByUserNameService,
  searchByEmailService,
  createUserService
} from "@/services/auth.service";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import { AuthValidationSchema } from "@/validators/register.validator";
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const parsedData = AuthValidationSchema.safeParse(data);
    if (!parsedData.success) {
      const error = parsedData.error.issues[0].message;
      return Response.json(
        { success: false, message: error },
        { status: 400 }
      )
    }
    const { username, email, password, avatar } = parsedData.data;
    const IsUserNameExist = await searchByUserNameService(username!);

    if (IsUserNameExist) {
      return Response.json({
        success: false,
        message: "Username already taken",
      }, { status: 400 })
    } else {
      const isUserEmailExist = await searchByEmailService(email);

      const verifyCode: number = Math.floor(100000 + Math.random() * 900000);
      const now = new Date()
      const expiresIn: Date = new Date(now.getTime() + 60 * 60 * 1000)
      if (isUserEmailExist) {
        if (isUserEmailExist.isVerified) {
          return Response.json({
            success: false,
            message: "Email already exist",
          }, {
            status: 400
          });
        } else {
          isUserEmailExist.verifyCode = verifyCode;
          isUserEmailExist.codeExpiry = expiresIn;
          await isUserEmailExist.save();
          await sendVerificationEmail(email, username!, verifyCode);
          return Response.json({
            success: true,
            message: "Verification code resent to your email.",
          }, {
            status: 200
          });
        }
      }
      const user = await createUserService(username!, email, password, verifyCode, expiresIn)
      await sendVerificationEmail(email, username!, verifyCode);
      return Response.json({
        success: true,
        message: "User registered successfully. Verification email sent.",
        data: user
      }, {
        status: 200
      });
    }
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      message: "Retry Again!",
    }, {
      status: 500
    });
  }
}
