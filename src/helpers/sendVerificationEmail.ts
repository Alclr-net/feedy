import { resend } from "@/lib/resend";
import EmailTemplate from "@/email/emailTemplate";
import { ApiResponse } from "@/types/global";

export default async function sendVerificationCode(
  email: string,
  username: string,
  verifyCode: number
): Promise<ApiResponse> {

  try {
    await resend.emails.send({
      from: "feedy@sethrachit.in",
      to: email,
      subject: "Verify your email address",
      react: EmailTemplate({

        username,
        verifyCode,
      }),
    });

    return {
      success: true,
      message: "Email Send Successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Email server isn't responding.",
    };
  }
}
