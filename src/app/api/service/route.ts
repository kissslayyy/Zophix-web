import dbConnect from "@/lib/dbConnect";
import Service from "@/model/Service.model";
import { date } from "zod";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { serviceName } = await request.json();
    const serviceExist = await Service.findOne({ serviceName });
    if (serviceExist) {
      return Response.json({
        success: false,
        message: "Service all ready exists",
      });
    }
    await Service.create({
      serviceName: serviceName.toLowerCase(),
      serviceSlug: serviceName.toLowerCase().trim().replace(/\s+/g, "-"),
    });
    return Response.json(
      {
        success: true,
        message: "Service added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while adding Service", error);
    return Response.json(
      {
        success: false,
        message: "error",
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
    const services = await Service.find();
    return Response.json(
      {
        success: true,
        message: "Service Fetch Successfully",
        data: services,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while fetching Service", error);
    return Response.json(
      {
        success: false,
        message: "error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { serviceSlug } = await request.json();
    await Service.findOneAndDelete({ serviceSlug });
    return Response.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log("Error while fetching Service", error);
    return Response.json(
      {
        success: false,
        message: "error",
      },
      {
        status: 500,
      }
    );
  }
}
