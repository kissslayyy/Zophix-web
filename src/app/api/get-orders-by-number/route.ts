import dbConnect from "@/lib/dbConnect";
import Order from "@/model/Order.model";
import User from "@/model/User.model";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  // Connect to the database
  await dbConnect();

  // Get the search parameters from the request
  const url = new URL(request.url);
  const phoneNumber = url.searchParams.get("phoneNumber");

  try {
    // Define a flexible query object
    const query: { status: string; phoneNumber?: string } = {
      status: "completed",
    };

    if (phoneNumber) {
      query.phoneNumber = phoneNumber;
    }

    // Fetch orders matching the query
    const orders = await Order.find(query)
      .populate({ path: "customerName", model: User, select: "name email" })
      .sort({ createdAt: -1 });

    // Revalidate the path to refresh the data

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
