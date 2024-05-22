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
        message: "Please enter phone model",
      });
    }
    if (!brand) {
      return Response.json({
        success: false,
        message: "Please enter phone company",
      });
    }
    
    // Check if the phoneModal already exists
    const existingPhoneModal = await PhoneModal.findOne({ brand, phoneModal });
    if (existingPhoneModal) {
      return Response.json({
        success: false,
        message: "Phone model already exists",
      });
    }

    // If it doesn't exist, create a new record
    await PhoneModal.create({ brand, phoneModal });

    return Response.json({
      success: true,
      message: "Phone model added successfully",
    });
  } catch (error) {
    console.log("Error while adding phone model", error);
    return Response.json(
      {
        success: false,
        message: "Error while adding phone model",
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


export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json({
        success: false,
        message: "Please provide the ID of the phone model to delete",
      });
    }

    // Check if the phone model exists
    const existingPhoneModal = await PhoneModal.findById(id);
    if (!existingPhoneModal) {
      return Response.json({
        success: false,
        message: "Phone model not found",
      });
    }

    // Delete the phone model
    await PhoneModal.deleteOne({ _id: id });

    return Response.json({
      success: true,
      message: "Phone model deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting phone model", error);
    return Response.json(
      {
        success: false,
        message: "Error while deleting phone model",
      },
      {
        status: 500,
      }
    );
  }
}
