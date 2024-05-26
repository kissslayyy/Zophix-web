import mongoose, { Schema, Model, Models, Document } from "mongoose";

export interface IPricing extends Document {
  phoneCompany: Schema.Types.ObjectId;
  phoneBrand: Schema.Types.ObjectId;
  serviceType: Schema.Types.ObjectId;
  price: string;
}

const PricingSchema = new Schema({
  phoneCompany: { type: Schema.Types.ObjectId, ref: "PhoneCompany" },
});
