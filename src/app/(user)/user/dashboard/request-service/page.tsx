"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { redirect, useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { createOrderRequest } from "@/lib/actions/order.action";
import { toast } from "sonner";

type BrandName = {
  _id: string;
  phoneCompany: string;
  phoneModal: string;
  serviceName: string;
};

const Page = () => {
  const [brandNames, setBrandNames] = useState<BrandName[]>([]);
  const [modalNames, setModalNames] = useState<BrandName[]>([]);
  const [service, setService] = useState("");
  const [serviceData, setServiceData] = useState<BrandName[]>();
  const [selectedModal, setSelectedModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const router = useRouter();
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
        setSelectedBrand(response.data.data[0].phonecompanies);
        setModalNames(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(selectedBrand, "selected brand");
  const getService = () => {
    setIsLoading(true);
    axios
      .get(`/api/service`)
      .then((response) => {
        setServiceData(response.data.data);
        setIsLoading(false);

        console.log(response.data.data, "");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
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
    getService();
  }, []);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });
  if (status === "loading") {
    return "Loading or not authenticated...";
  }
  const str = "pending";
  const user: User = session?.user;
  const userId: string = user?._id ?? ""; // Using optional chaining and nullish coalescing operator to ensure userId is always a string
  console.log(userId, "use id");
  async function onSubmit(values: z.infer<typeof OrderRequestSchema>) {
    setIsLoading(true);
    try {
      await createOrderRequest({
        customerName: userId,
        description: values.description!,
        issue: service,
        phoneCompany: selectedBrand,
        phoneModel: selectedModal,
        status: "str",
        phoneNumber: values.phoneNumber,
      });
      toast.success("Order Sent successfully");
      router.push("/user/dashboard");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("error");
    }
  }

  return (
    <Card className="mt-4 mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="text-xl">Create an Order</CardTitle>
        <CardDescription>Enter the details of your issue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" grid gap-2 my-auto grid-cols-2"
            >
              <FormField
                control={form.control}
                name="phoneCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Company</FormLabel>
                    <select
                      name="HeadlineAct"
                      id="HeadlineAct"
                      className=" inline-flex h-12 w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-xl   leading-none text-black shadow-[0_2px_10px]  shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                      onChange={(e) => {
                        getPhoneModal(e.target.value);
                      }}
                    >
                      <option className="py-4 text-base  " value="">
                        Select a Your Brand
                      </option>
                      {brandNames &&
                        brandNames.map((e, i) => {
                          return (
                            <>
                              <option
                                key={e._id}
                                className="w-full  text-xl "
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
                    <FormLabel>Phone Modal</FormLabel>
                    <select
                      name="HeadlineAct"
                      id="HeadlineAct"
                      className=" inline-flex h-12 w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-xl   leading-none text-black shadow-[0_2px_10px]  shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                      onChange={(e) => {
                        setSelectedModal(e.target.value);
                      }}
                    >
                      <option className="py-4 text-base  " value="">
                        Select a Your Brand
                      </option>
                      {modalNames &&
                        modalNames.map((e, i) => {
                          return (
                            <>
                              <option
                                key={e._id}
                                className="w-full  text-xl "
                                value={e.phoneModal}
                              >
                                {e.phoneModal}
                              </option>
                            </>
                          );
                        })}
                    </select>
                    <FormDescription>
                      You can manage email addresses in your{" "}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your phone number"
                        />
                      </FormControl>
                      <FormDescription>Your contact number.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="issue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue</FormLabel>
                      <FormControl>
                        <select
                          name="HeadlineAct"
                          id="HeadlineAct"
                          className=" inline-flex h-12 w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-xl   leading-none text-black shadow-[0_2px_10px]  shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                          onChange={(e) => {
                            setService(e.target.value);
                          }}
                        >
                          <option className="py-4 text-base  " value="">
                            Select a Your Brand
                          </option>
                          {serviceData &&
                            serviceData.map((e, i) => {
                              return (
                                <>
                                  <option
                                    key={e._id}
                                    className="w-full capitalize text-xl "
                                    value={e.serviceName}
                                  >
                                    {e.serviceName}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                      </FormControl>
                      <FormDescription>
                        Brief description of the problem.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Any additional information.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isLoading} variant="secondary" type="submit">
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
