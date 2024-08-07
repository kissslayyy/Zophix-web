import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "@/model/User.model"; // Adjust the import according to your project structure
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Parse the request body
    const { email, newPassword } = await request.json();

    // Validate input
    if (!email || !newPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email, new password, and v",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verify the verification code

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated user
    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Password updated successfully",
        data: { email: user.email },
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);

    // Ensure error is an instance of Error
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to update password",
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
