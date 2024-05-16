import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IPhoneCompany extends Document {
  phoneCompany: string;
  createAt: Date;
}

const PhoneCompanySchema = new Schema({
  phoneCompany: { type: String, require: true },
  createAt: { type: Date, default: Date.now },
});

const PhoneCompany =
  models.PhoneCompany || model("PhoneCompany", PhoneCompanySchema);

export default PhoneCompany;
