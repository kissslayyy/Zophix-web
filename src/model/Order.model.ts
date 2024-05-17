import mongoose, { Schema, models, model, Document } from "mongoose";

export interface IOrder extends Document {
  issue: string;
  description: string;
  phoneCompany: string;
  phoneModel: string;
  phoneNumber: string;
  customerName: Schema.Types.ObjectId;
  status: string;
  orderAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema({
  issue: { type: String, require: true },
  description: { type: String, require: true },
  phoneCompany: { type: String, require: true },
  phoneModel: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  customerName: [{ type: Schema.Types.ObjectId, ref: "User" }],
  status: { types: String, default: "Pending" },
  orderAt: { type: Date, default: Date.now },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
