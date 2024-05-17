import dbConnect from "@/lib/dbConnect";
import Order from "@/model/Order.model";
import User from "@/model/User.model";

export async function GET(request: Request) {
  dbConnect();
  try {
    const orders = await Order.find({})
      .populate({ path: "customerName", model: User, select: "name email" })
      .sort({ createdAt: -1 });
    return Response.json(
      {
        success: true,
        message: "Fetched success fully",
        data: orders,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function POST(request: Request) {
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
