import dbConnect from "@/lib/dbConnect";
import PhoneCompany from "@/model/PhoneCompany.model";
import PhoneModal from "@/model/PhoneModal.model";
import { type NextRequest } from "next/server";
import mongoose, { ObjectId } from "mongoose";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { phoneModal, brand } = await request.json();
    if (!phoneModal) {
      return Response.json({
        success: false,
        message: "Please enter phone modal",
      });
    }
    if (!brand) {
      return Response.json({
        success: false,
        message: "Please enter phone company",
      });
    }
    console.log(brand, "b");
    await PhoneModal.create({ brand, phoneModal });

    return Response.json({
      success: true,
      message: "Phone modal added successfully",
    });
  } catch (error) {
    console.log("Error while adding phone modal", error);
    return Response.json(
      {
        success: false,
        message: "Error while adding phone modal",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("brand") || "";

    const id = new mongoose.Types.ObjectId(query);
    console.log(id);
    const data = await PhoneCompany.findOne({
      _id: "6645ddd4f08bcded6fc1ba03",
    });
    console.log(data);
    const phoneModals = await PhoneModal.aggregate([
      {
        $match: {
          brand: id,
        },
      },
      {
        $lookup: {
          from: "phonecompanies",
          localField: "brand", // Assuming brand refers to phone company ID
          foreignField: "_id", // Assuming company ID is stored in _id field
          as: "phonecompany",
        },
      },
      {
        $project: {
          phoneModal: 1,
          phonecompanies: { $first: "$phonecompany.phoneCompany" },
        },
      },
    ]);
    return Response.json({
      success: true,
      message: "Phone modal fetched successfully",
      data: phoneModals,
    });
  } catch (error) {
    console.log("Error while adding phone modal", error);
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
