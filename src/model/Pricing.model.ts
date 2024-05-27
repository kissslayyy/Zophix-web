import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IPricing extends Document {
  phoneCompany: Schema.Types.ObjectId;
  phoneModal: Schema.Types.ObjectId;
  serviceType: Schema.Types.ObjectId;
  price: string;
}

const PricingSchema = new Schema({
  phoneCompany: { type: Schema.Types.ObjectId, ref: "PhoneCompany" },
  phoneModal: { type: Schema.Types.ObjectId, ref: "PhoneModal" },
  serviceType: { type: Schema.Types.ObjectId, ref: "Service" },
  price: { type: String, require: true },
});

const Price = models.Price || model("Price", PricingSchema);

export default Price;
