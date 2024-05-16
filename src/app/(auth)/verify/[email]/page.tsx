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

import { VerifySchema } from "@/validation/validation";
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

export default function Page({ params }: { params: { email: string } }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
  });
  const onSubmit = async (data: z.infer<typeof VerifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        email: decodeURIComponent(params.email),
        code: data.verifyCode,
      });
      toast.success(response.data.message);
      router.replace("/sign-in");
    } catch (error: any) {
      console.error("Error while signing up user", error);

      toast.error(error.message);
    }
  };
  return (
    <div className="grid grid-cols-1 h-[75vh] lg:h-screen justify-items-center content-center  ">
      <Card className="my-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Otp</CardTitle>
          <CardDescription>
            Enter your otp below to verify to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                          className="border-black border bg-black"
                          {...field}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />

                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm"></div>
        </CardContent>
      </Card>
    </div>
  );
}
