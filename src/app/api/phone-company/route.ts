import dbConnect from "@/lib/dbConnect";
import PhoneCompany from "@/model/PhoneCompany.model";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { phoneCompany } = await request.json();
    const phoneCompanyExist = await PhoneCompany.findOne({ phoneCompany });
    if (phoneCompanyExist) {
      return Response.json({
        success: false,
        message: "This phone company already exist",
      });
    }
    await PhoneCompany.create({ phoneCompany });
    return Response.json({
      success: true,
      message: "phone company added successfully",
    });
  } catch (error) {
    console.log("Error  user", error);
    return Response.json(
      {
        success: false,
        message: "Error adding phone",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  try {
    const phoneCompanies = await PhoneCompany.find();
    return Response.json({
      success: true,
      message: "Phone",
      data: phoneCompanies,
    });
  } catch (error) {
    console.log("Error  user", error);
    return Response.json(
      {
        success: false,
        message: "Error at api",
      },
      {
        status: 500,
      }
    );
  }
}
