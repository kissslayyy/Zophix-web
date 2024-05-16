import mongoose, { Schema, models, model, Document } from "mongoose";

export interface IPhonModal extends Document {
  phoneModal: string;
  brand: Schema.Types.ObjectId;
  createAt: Date;
}

const PhoneModalSchema: Schema<IPhonModal> = new Schema({
  phoneModal: { type: String, require: true },
  brand: { type: Schema.Types.ObjectId, ref: "PhoneCompany" },
  createAt: { type: Date, default: Date.now },
});

const PhoneModal = models.PhoneModal || model("PhoneModal", PhoneModalSchema);
export default PhoneModal;
