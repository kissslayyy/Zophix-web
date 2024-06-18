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

  try {
    let orders;
    if (orderId) {
      // Fetch the specific order by ID
      orders = await Order.findById(orderId).populate({
        path: "customerName",
        model: User,
        select: "name email",
      });
      if (!orders) {
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
    } else {
      // Fetch all orders
      orders = await Order.find({})
        .populate({ path: "customerName", model: User, select: "name email" })
        .sort({ createdAt: -1 });
    }

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
