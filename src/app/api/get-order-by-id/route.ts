import dbConnect from "@/lib/dbConnect";
import Order from "@/model/Order.model";
import User from "@/model/User.model";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  // Connect to the database
  await dbConnect();

  // Extract the order ID from the query parameters
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");

  if (!orderId) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Order ID is required",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store", // Prevent caching
        },
      }
    );
  }

  try {
    // Fetch the specific order by ID
    const order = await Order.findById(orderId).populate({
      path: "customerName",
      model: User,
      select: "name email",
    });

    if (!order) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Order not found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Prevent caching
          },
        }
      );
    }

    revalidatePath("/admin/dashboard");
    return new Response(
      JSON.stringify({
        success: true,
        message: "Order fetched successfully",
        data: order,
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
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while fetching the order",
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
