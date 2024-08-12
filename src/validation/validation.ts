import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const VerifySchema = z.object({
  verifyCode: z
    .string()
    .min(5, { message: "Verification code must be 5 digits" }),
});

export const ResetPasswordSchema = z.object({
  verifyCode: z
    .string()
    .min(5, { message: "Verification code must be 5 digits" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const SignInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const requestPasswordReset = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const OrderRequestSchema = z.object({
  phoneCompany: z.string(),
  phoneModel: z.string(),
  issue: z.string(),
  price: z.number(),
  description: z.string().optional(),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number must be at most 10 digits" }),
});

export const AddPriceSchema = z.object({
  phoneCompany: z.string(),
  phoneModel: z.string(),
  serviceType: z.string(),
  price: z.string(),
});
