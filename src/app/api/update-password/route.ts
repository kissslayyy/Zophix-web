import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "@/model/User.model"; // Adjust the import according to your project structure
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  dbConnect();

  try {
    // Parse the request body
    const { userId, currentPassword, newPassword } = await request.json();

    // Validate input
    if (!userId || !currentPassword || !newPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User ID, current password, and new password are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find the user by ID
    const user = await User.findById(userId);

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

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Current password is incorrect",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated user
    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Password updated successfully",
        data: { userId: user._id },
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
