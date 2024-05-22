import dbConnect from "@/lib/dbConnect";
import Order from "@/model/Order.model";
import User from "@/model/User.model";
import { ObjectId } from "mongodb"; // Import ObjectId from mongodb package

export async function GET(request: Request) {
  // Connect to the database
  await dbConnect();

  // Extract the ID from the URL path
  const urlParts = request.url.split('/');
  const id = urlParts[urlParts.length - 1];
  console.log(id, "inside server")
  if (ObjectId.isValid(id)) {
    try {
      // Fetch the order by ID
      const order = await Order.findById(id).populate({
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
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Fetched successfully",
          data: order,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } else {
    // If no valid ID is provided, fetch all orders as before
    try {
      const orders = await Order.find({})
        .populate({ path: "customerName", model: User, select: "name email" })
        .sort({ createdAt: -1 });
      return new Response(
        JSON.stringify({
          success: true,
          message: "Fetched successfully",
          data: orders,
        }),
        {
          headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
}
