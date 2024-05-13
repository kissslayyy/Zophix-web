import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpire: Date;
  isVerified: boolean;
  role?: string;
  location?: string;
  joinedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: [true, "please enter your full name"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "please use a valid email address"],
  },
  password: { type: String, required: [true, "password is required"] },
  verifyCode: { type: String, required: [true, "Verify code is required"] },
  verifyCodeExpire: { type: Date, required: [true, "Verify code is required"] },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: { type: String, default: "customer" },
  location: { type: String },
});

const User = models.User || model("User", UserSchema);
export default User;
