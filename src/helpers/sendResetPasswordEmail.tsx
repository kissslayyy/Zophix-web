import { resend } from "@/lib/resend";
import ResetPasswordEmail from "../../emails/resetPasswordEmail";
import { APiResponse } from "@/types/apiResponse";

export async function sendResetPasswordEmail(
  email: string,
  name: string,
  resetCode: string
): Promise<APiResponse> {
  try {
    await resend.emails.send({
      from: "dev@zophix.com",
      to: email,
      subject: "Reset Your Password",
      react: ResetPasswordEmail({ name, resetCode }), // Assuming you have a template for reset password email
    });
    return {
      success: true,
      message: "Reset password email sent successfully",
    };
  } catch (emailError) {
    console.error("Error sending reset password email", emailError);
    return {
      success: false,
      message: "Failed to send reset password email",
    };
  }
}
