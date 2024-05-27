import dbConnect from "@/lib/dbConnect";
import Price from "@/model/Pricing.model";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { phoneCompany, phoneModal, serviceType, price } =
      await request.json();

    // Validate the request body
    if (!phoneCompany || !phoneModal || !serviceType || !price) {
      return Response.json(
        {
          success: true,
          message: "Missing Fields",
        },
        {
          status: 400,
        }
      );
    }

    const newPrice = new Price({
      phoneCompany,
      phoneModal,
      serviceType,
      price,
    });
    await newPrice.save();

    return Response.json(
      {
        success: true,
        message: "Price added successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: true,
        message: "Internal server error",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
