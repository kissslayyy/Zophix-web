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
import { SignInSchema } from "@/validation/validation";
import { toast } from "sonner";
import result from "postcss/lib/result";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast.error("Incorrect username or password");
      } else {
        toast.error(result.error);
      }
    }

    if (result?.url) {
      router.replace("/user/dashboard");
      toast.success("Login success");
    }
    setIsLoading(false);
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
              Member login
            </h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 lg:space-y-6"
            >
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/Username</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <span>Password </span>{" "}
                      <Link
                        className="text-blue underline"
                        href="/reset-password"
                      >
                        Forgot Password?
                      </Link>
                    </FormLabel>
                    <Input type="password" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button
                  className=" "
                  disabled={isLoading}
                  variant="update"
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className=" size-4 animate-spin" /> Loading...
                    </>
                  ) : (
                    "Log-In"
                  )}
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
