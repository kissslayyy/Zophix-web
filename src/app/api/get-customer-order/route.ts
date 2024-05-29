import dbConnect from "@/lib/dbConnect";
import Order from "@/model/Order.model";
import User from "@/model/User.model";
import { ObjectId } from "mongodb"; // Import ObjectId from mongodb package

export async function GET(request: Request) {
  // Connect to the database
  await dbConnect();

  // Extract the customerId from the query parameters
  const url = new URL(request.url);
  const customerId = url.searchParams.get("customerId");

  if (customerId && ObjectId.isValid(customerId)) {
    try {
      // Fetch orders by customer ID
      const orders = await Order.find({ customerName: customerId }).populate({
        path: "customerName",
        model: User,
        select: "name email",
      });

      if (!orders || orders.length === 0) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "No orders found for this customer",
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
          data: orders,
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
          message: "An error occurred while fetching the orders",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid customer ID",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
