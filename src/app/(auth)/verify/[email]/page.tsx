"use client";
import Link from "next/link";

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
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Page({ params }: { params: { email: string } }) {
  const [isSubmitting, setIsSubmitting]= useState(false)
  const router = useRouter();
  const form = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
  });
  const onSubmit = async (data: z.infer<typeof VerifySchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post(`/api/verify-code`, {
        email: decodeURIComponent(params.email),
        code: data.verifyCode,
      });
      toast.success(response.data.message);
      router.replace("/sign-in");
      setIsSubmitting(false)
    } catch (error: any) {
      console.error("Error while signing up user", error);

      toast.error('failed to verify ');
      setIsSubmitting(false)
    }
  };
  return (
    <div className="flex justify-center   items-center lg:min-h-screen bg-gray-500">
    <div className="w-full max-w-fit gap-0  grid grid-cols-1 p-8  content-center text-black bg-white lg:rounded-lg ">
      <div className="size-3/4   mx-auto  ">
        <Image
          src="/logIn.svg"
          alt="login"
          width={220}
          height={220}
          className="object-contain size-full"
        />
      </div>
      <div className="my-auto ">
        <div className="text-start">
          <h1 className="text-xl font-bold tracking-tight lg:text-3xl mb-4">
            OTP Verification
          </h1>
        </div>
          <div className=" ">
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
                        disabled={isSubmitting}
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
                 
                 
                  <div className="flex lg:justify-end lg:pt-4">
                <Button disabled={isSubmitting}  variant="update" type="submit">
                  {isSubmitting ?<>
                  <Loader2 className=" size-4 animate-spin"/>
                  Submitting
                  </>:<>
                  
                  Submit
                  </>}
                  </Button>
                    </div>  
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm"></div>
          </div>
      </div>
    </div>
  );
}
