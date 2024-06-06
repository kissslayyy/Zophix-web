import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect"; // Adjust the import according to your project structure
import User from "@/model/User.model"; // Adjust the import according to your project structure
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  dbConnect();

  try {
    // Fetch all users
    const users = await User.find({});

    return new Response(
      JSON.stringify({
        success: true,
        message: "Fetched users successfully",
        data: users,
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
    revalidatePath("/admin/dashboard");
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch users",
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
