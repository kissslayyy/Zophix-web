"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderRequestSchema } from "@/validation/validation";
import axios from "axios";

type BrandName = {
  _id: string;
  phoneCompany: string;
};

const Page = () => {
  const [brandNames, setBrandNames] = useState<BrandName[]>([]);
  const [modalNames, setModalNames] = useState<BrandName[]>([]);
  const getBrandNames = () => {
    axios
      .get("/api/phone-company")
      .then((response) => {
        setBrandNames(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPhoneModal = (id: string) => {
    console.log(id, "yesy");
    axios
      .get(`/api/phone-modal/?brand=${id}`)
      .then((response) => {
        setModalNames(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const form = useForm<z.infer<typeof OrderRequestSchema>>({
    resolver: zodResolver(OrderRequestSchema),
    defaultValues: {
      issue: "",
      description: "",
      phoneCompany: "",
      phoneModel: "",
      phoneNumber: "",
    },
  });
  useEffect(() => {
    getBrandNames();
  }, []);

  function onSubmit(values: z.infer<typeof OrderRequestSchema>) {
    console.log(values);
  }

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });
  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  const user: User = session?.user;

  return (
    <Card className="mt-4 mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="text-xl">Create an Order</CardTitle>
        <CardDescription>Enter the details of your issue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="phoneCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Company</FormLabel>
                    <select
                      name="HeadlineAct"
                      id="HeadlineAct"
                      className=" inline-flex h-12 w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-xl  font-medium leading-none text-black shadow-[0_2px_10px]  shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                      onChange={(e) => {
                        getPhoneModal(e.target.value);
                      }}
                    >
                      <option className="py-4 text-base font-medium " value="">
                        Select a Your
                      </option>
                      {brandNames &&
                        brandNames.map((e, i) => {
                          return (
                            <>
                              <option
                                key={e._id}
                                className="w-full  text-xl font-medium"
                                value={e._id}
                              >
                                {e.phoneCompany}
                              </option>
                            </>
                          );
                        })}
                    </select>
                    <FormDescription>
                      Choose the brand of your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Model</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your phone model" />
                    </FormControl>
                    <FormDescription>
                      Provide the model of your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your phone number" />
                    </FormControl>
                    <FormDescription>Your contact number.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Describe the issue" />
                    </FormControl>
                    <FormDescription>
                      Brief description of the problem.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Additional details" />
                    </FormControl>
                    <FormDescription>
                      Any additional information.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
