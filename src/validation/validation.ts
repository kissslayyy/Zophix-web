import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be 6 character" }),
});

export const VerifySchema = z.object({
  verifyCode: z.string().min(5, "Verification code must be 6 digit"),
});

export const SignInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const OrderRequestSchema = z.object({
  phoneCompany: z.string(),
  phoneModel: z.string(),
  issue: z.string(),
  description: z.string().optional(),
  phoneNumber: z.string().min(10).max(10),
});
