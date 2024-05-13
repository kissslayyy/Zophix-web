import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { APiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
  email: string,
  name: string,
  verifyCode: string
): Promise<APiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Zophix Verification Code",
      react: VerificationEmail({ name, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Verification email send successfully",
    };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return {
      success: false,
      message: "failed to send verification email",
    };
  }
}
