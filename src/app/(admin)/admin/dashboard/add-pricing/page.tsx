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
import { AddPriceSchema, OrderRequestSchema } from "@/validation/validation";
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
        const data = response.data.data;
        if (Array.isArray(data) && data.length > 0) {
          setSelectedBrand(data[0]._id);
          if (data[0].phonecompanies === undefined) {
            setModalNames([]);
          } else {
            setModalNames(data);
          }
        } else {
          setModalNames([]);
        }
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setModalNames([]); // Set modal names to empty array in case of an error
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

  const form = useForm<z.infer<typeof AddPriceSchema>>({
    resolver: zodResolver(AddPriceSchema),
    defaultValues: {
      serviceType: "",
      price: "",
      phoneCompany: "",
      phoneModel: "",
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
  const user: User = session?.user;
  const userId: string = user?._id ?? ""; // Using optional chaining and nullish coalescing operator to ensure userId is always a string
  console.log(userId, "use id");
  async function onSubmit(values: z.infer<typeof AddPriceSchema>) {
    setIsLoading(true);
    try {
      await axios.post(`/api/add-pricing`, {
        serviceType: service,
        phoneCompany: selectedBrand,
        phoneModal: selectedModal,
        price: values.price,
      });
      toast.success("Order Sent successfully");
      router.push("/admin/dashboard");
      form.reset();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("error");
      form.reset();
    }
  }

  return (
    <Card className="mt-4 mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="text-xl">Create pricing for services</CardTitle>
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
                        Select a Your Company
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
                        Select a Your Modal
                      </option>
                      {modalNames &&
                        modalNames.map((e, i) => {
                          return (
                            <>
                              <option
                                key={e._id}
                                className="w-full  text-xl "
                                value={e._id}
                              >
                                {e.phoneModal}
                              </option>
                            </>
                          );
                        })}
                    </select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service</FormLabel>
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
                            Select a Service
                          </option>
                          {serviceData &&
                            serviceData.map((e, i) => {
                              return (
                                <>
                                  <option
                                    key={e._id}
                                    className="w-full capitalize text-xl "
                                    value={e._id}
                                  >
                                    {e.serviceName}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add Price</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter price" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Button disabled={isLoading} variant="update" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
