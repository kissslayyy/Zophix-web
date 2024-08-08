import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IService extends Document {
  serviceName: string;
  serviceSlug: string;
  createdAt: Date;
}

const ServiceSchema = new Schema({
  serviceName: { type: String, required: true },
  serviceSlug: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Service = models.Service || model<IService>("Service", ServiceSchema);

export default Service;
