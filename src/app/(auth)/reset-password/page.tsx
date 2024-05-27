"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { requestPasswordReset } from "@/validation/validation";
import { toast } from "sonner";
import result from "postcss/lib/result";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { APiResponse } from "@/types/apiResponse";

export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof requestPasswordReset>>({
    resolver: zodResolver(requestPasswordReset),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof requestPasswordReset>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<APiResponse>(
        `/api/request-password-reset`,
        data
      );
      toast.success(response.data.message);
      router.replace(`/reset-password/${email}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error while signing up user", error);
      setIsSubmitting(false);
      toast.error("Sign up failed");
    }
  };

  return (
    <div className="flex justify-center  items-center lg:min-h-screen bg-gray-500">
      <div className="w-full max-w-fit  grid lg:grid-cols-2 p-8 space-y-8  text-black bg-white lg:rounded-lg ">
        <div className="w-full h-full max-w-xs p-8   ">
          <Image
            src="/forgotPassword.svg"
            alt="forgotPassword"
            width={220}
            height={220}
            className="object-contain size-full"
          />
        </div>
        <div>
          <div className="text-start">
            <h1 className="text-xl font-bold tracking-tight lg:text-3xl mb-4">
              Reset password
            </h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 lg:space-y-6"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/Username</FormLabel>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setEmail(e.target.value);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button className=" " variant="update" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center  mt-4">
            <p>
              Not a member yet?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
