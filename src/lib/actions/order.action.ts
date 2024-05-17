"use server";

import Order from "@/model/Order.model";
import dbConnect from "../dbConnect";
import { CreateOrderParams } from "./shared.types";
import { revalidatePath } from "next/cache";

export async function createOrderRequest(params: CreateOrderParams) {
  try {
    const {
      customerName,
      description,
      issue,
      phoneNumber,
      phoneCompany,
      phoneModel,
      status,
    } = params;
    dbConnect();
    console.log("here");
    const order = await Order.create({
      customerName,
      description,
      issue,
      phoneNumber,
      phoneCompany,
      phoneModel,
      status,
    });
    revalidatePath("/user/dashboard");
  } catch (error) {
    console.log("here");
    console.log(error);
    throw error;
  }
}
