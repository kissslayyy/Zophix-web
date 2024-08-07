"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ResetPasswordSchema } from "@/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useState } from "react";

export default function Page({ params }: { params: { email: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/password-reset`, {
        email: decodeURIComponent(params.email),
        verifyCode: data.verifyCode,
        newPassword: data.newPassword,
      });
      toast.success(response.data.message);
      router.replace("/sign-in");
    } catch (error: any) {
      console.error("Error while signing up user", error);

      toast.error(error.message);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="flex justify-center  items-center lg:min-h-screen bg-gray-500">
      <div className="w-full max-w-fit  grid lg:grid-cols-2 p-8 space-y-8  text-black bg-white lg:rounded-lg ">
        <div className="w-full h-full max-w-xs p-8   ">
          <Image
            src="/logIn.svg"
            alt="login"
            width={220}
            height={220}
            className="object-contain size-full"
          />
        </div>
        <div>
          <div className="text-start">
            <h1 className="text-xl font-bold tracking-tight lg:text-3xl mb-4">
              Update password
            </h1>
          </div>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="verifyCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={5}
                          className="border-black w-full border text-black bg-black"
                          {...field}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="text-black"
                          placeholder="new password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={isSubmitting}
                  variant={"update"}
                  type="submit"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm"></div>
        </div>
      </div>
    </div>
  );
}
