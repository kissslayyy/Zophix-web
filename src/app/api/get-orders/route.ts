import dbConnect from "@/lib/dbConnect";
import Order from "@/model/Order.model";
import User from "@/model/User.model";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    // Fetch all orders
    const orders = await Order.find({})
      .populate({ path: "customerName", model: User, select: "name email" })
      .sort({ createdAt: -1 });
    revalidatePath("/admin/dashboard");
    return new Response(
      JSON.stringify({
        success: true,
        message: "Fetched successfully",
        data: orders,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store", // Prevent caching
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while fetching the orders",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store", // Prevent caching
        },
      }
    );
  }
}
