"use server";

import Order from "@/model/Order.model";
import dbConnect from "../dbConnect";
import { CreateOrderParams } from "./shared.types";

export async function createOrderRequest(params: CreateOrderParams) {
  try {
    const {
      customerName,
      description,
      issue,
      phoneCompany,
      phoneModel,
      status,
    } = params;
    dbConnect();
    const order = await Order.create({
      customerName,
      description,
      issue,
      phoneCompany,
      phoneModel,
      status,
    });
    return { order };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
