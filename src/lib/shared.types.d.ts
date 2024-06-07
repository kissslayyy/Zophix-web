import { Schema } from "mongoose";

import { IUser } from "@/mongodb";
import { User } from "next-auth";

export interface CreateOrderParams {
  issue: string;
  description: string | "";
  phoneCompany: string;
  phoneModel: string;
  phoneNumber: string;
  customerName: Schema.Types.ObjectId | IUser;
  status: string;
}
