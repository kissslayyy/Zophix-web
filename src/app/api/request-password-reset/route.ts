import { sendResetPasswordEmail } from "@/helpers/sendResetPasswordEmail";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found with this email",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const verifyCode = Math.floor(10000 + Math.random() * 90000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour from now

    user.verifyCode = verifyCode;
    user.verifyCodeExpire = expiryDate;

    await user.save();

    // Send verification email
    const emailResponse = await sendResetPasswordEmail(
      email,
      user.name,
      verifyCode
    );
    if (!emailResponse.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: emailResponse.message,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Verification code sent to your email",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending verification email", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error sending verification email",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
