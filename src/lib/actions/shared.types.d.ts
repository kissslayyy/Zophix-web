import { Schema } from "mongoose";

import { IUser } from "@/mongodb";

export interface CreateOrderParams {
  issue: string;
  description: string;
  phoneCompany: string;
  phoneModel: string;
  customerName: Schema.Types.ObjectId;
  status: string;
}
