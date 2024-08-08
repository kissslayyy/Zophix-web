import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IPricing extends Document {
  phoneCompany: Schema.Types.ObjectId;
  phoneModal: Schema.Types.ObjectId;
  serviceType: Schema.Types.ObjectId;
  price: string;
}

const PricingSchema = new Schema({
  phoneCompany: {
    type: Schema.Types.ObjectId,
    ref: "PhoneCompany",
    required: true,
  },
  phoneModal: {
    type: Schema.Types.ObjectId,
    ref: "PhoneModal",
    required: true,
  },
  serviceType: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  price: { type: String, required: true },
});

const Price = models.Price || model<IPricing>("Price", PricingSchema);

export default Price;
