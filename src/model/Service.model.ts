import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IService extends Document {
  serviceName: string;
  serviceSlug: string;
  createAt: Date;
}

const ServiceSchema = new Schema({
  serviceName: { type: String, require: true },
  serviceSlug: { type: String, require: true },
  createAt: { type: Date, default: Date.now },
});

const Service = models.Service || model("Service", ServiceSchema);
export default Service;
