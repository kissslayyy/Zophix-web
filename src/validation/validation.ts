import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be 6 character" }),
});

export const VerifySchema = z.object({
  verifyCode: z.string().min(6, "Verification code must be 6 digit"),
});

export const SignInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const OrderRequest = z.object({
  phoneCompany: z.string(),
  modalName: z.string(),
  issueLabe: z.string(),
  issueExplained: z.string().optional(),
});
