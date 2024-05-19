import dbConnect from "@/lib/dbConnect";
import Order from "@/model/Order.model";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  dbConnect();

  try {
    // Parse the request body
    const { orderId, status } = await request.json();

    // Validate input
    if (!orderId || !status) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Order ID and status are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find the order by ID and update its status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!order) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Order not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    revalidatePath("/admin/dashboard/");
    return new Response(
      JSON.stringify({
        success: true,
        message: "Order status updated successfully",
        data: order,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to update order status",
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
