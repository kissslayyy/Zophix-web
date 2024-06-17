"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { redirect, useRouter } from "next/navigation";
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
import Bill from "@/components/shared/Bill";
import Loading from "../loading";
import { Loader2 } from "lucide-react";

type BrandName = {
  _id: string;
  phoneCompany: string;
  phoneModal: string;
  serviceName: string;
};

type PricingData = {
  id: string;
  phoneCompany: string;
  phoneModal: string;
  serviceType: string;
  price: number;
};

const Page = () => {
  const [brandNames, setBrandNames] = useState<BrandName[]>([]);
  const [modalNames, setModalNames] = useState<BrandName[]>([]);
  const [service, setService] = useState("");
  const [serviceData, setServiceData] = useState<BrandName[]>([]);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedModalId, setSelectedModalId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [pricingData, setPricingData] = useState<PricingData[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
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
    axios
      .get(`/api/phone-modal/?brand=${id}`)
      .then((response) => {
        setSelectedBrand(response.data.data[0].phonecompanies);
        setModalNames(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getService = () => {
    setIsLoading(true);
    axios
      .get(`/api/service`)
      .then((response) => {
        setServiceData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const getPricingData = (
    phoneCompanyId: string,
    phoneModalId: string,
    serviceTypeName: string
  ) => {
    setIsLoading(true);
    axios
      .get("/api/get-pricing/", {
        params: {
          phoneCompanyId,
          phoneModal: phoneModalId,
          servicietype: serviceTypeName,
        },
      })
      .then((response) => {
        setPricingData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
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
  useEffect(() => {
    getPricingData(selectedBrandId, selectedModalId, service);
  }, [selectedBrandId, selectedModalId, service]);
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
  const userId: string = user?._id ?? "";

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  async function onSubmit(values: z.infer<typeof OrderRequestSchema>) {
    setIsSubmitting(true);
    try {
      console.log("Submitting form...");
      await createOrderRequest({
        customerName: userId,
        description: values.description!,
        price: pricingData[0].price,
        issue: service,
        phoneCompany: selectedBrand,
        phoneModel: selectedModal,
        status: "pending",
        phoneNumber: values.phoneNumber,
      });
      toast.success("Order Sent successfully");
      router.push("/user/dashboard");
    } catch (error) {
      console.log("Error creating order:", error);
      toast.error("Error creating order");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid grid-cols-2">
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
                className="grid gap-2 my-auto grid-cols-2"
              >
                <FormField
                  control={form.control}
                  name="phoneCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Company</FormLabel>
                      <select
                        name="phoneCompany"
                        id="phoneCompany"
                        className="inline-flex h-12 w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-xl leading-none text-black shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                        onChange={(e) => {
                          const selectedBrand = brandNames.find(
                            (b) => b._id === e.target.value
                          );
                          if (selectedBrand) {
                            setSelectedBrand(selectedBrand.phoneCompany);
                            setSelectedBrandId(selectedBrand._id);
                            getPhoneModal(selectedBrand._id);
                          }
                        }}
                      >
                        <option className="py-4 text-base" value="">
                          Select a Your Brand
                        </option>
                        {brandNames &&
                          brandNames.map((e) => (
                            <option
                              key={e._id}
                              className="w-full text-xl"
                              value={e._id}
                            >
                              {e.phoneCompany}
                            </option>
                          ))}
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
                      <select
                        name="phoneModel"
                        id="phoneModel"
                        className="inline-flex h-12 w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-xl leading-none text-black shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                        onChange={(e) => {
                          const selectedModal = modalNames.find(
                            (m) => m.phoneModal === e.target.value
                          );
                          if (selectedModal) {
                            setSelectedModal(selectedModal.phoneModal);
                            setSelectedModalId(selectedModal._id);
                          }
                        }}
                      >
                        <option className="py-4 text-base" value="">
                          Select a Your Model
                        </option>
                        {modalNames &&
                          modalNames.map((e) => (
                            <option
                              key={e._id}
                              className="w-full text-xl"
                              value={e.phoneModal}
                            >
                              {e.phoneModal}
                            </option>
                          ))}
                      </select>
                      <FormDescription>
                        Choose the model of your phone.
                      </FormDescription>
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
                      <select
                        name="issue"
                        id="issue"
                        className="inline-flex h-12 w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-xl leading-none text-black shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                        onChange={(e) => setService(e.target.value)}
                      >
                        <option className="py-4 text-base" value="">
                          Select an Issue
                        </option>
                        {serviceData &&
                          serviceData.map((e) => (
                            <option
                              key={e._id}
                              className="w-full text-xl"
                              value={e.serviceName}
                            >
                              {e.serviceName}
                            </option>
                          ))}
                      </select>
                      <FormDescription>
                        Choose the issue you are facing.
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
                        <Input
                          type="text"
                          placeholder="Enter your phone number"
                          {...field}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your contact number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your issue"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide additional details about your issue.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button
                    onClick={() => onSubmit(form.getValues())}
                    className="col-span-2"
                    disabled={isSubmitting}
                    variant="update"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                  <Button
                    onClick={() => {
                      getPricingData(selectedBrandId, selectedModalId, service);
                    }}
                  >
                    Get Price
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <div>
        {pricingData?.length > 0 &&
          selectedBrand &&
          selectedModal &&
          service &&
          phoneNumber && (
            <>
              {isLoading && (
                <Loader2 className="animate-spin h-screen m-auto" />
              )}
              <Bill
                amountDue={pricingData[0]?.price}
                amountPaid={0}
                customerName={user.name!}
                orderId="001"
                customerPhoneNumber={phoneNumber}
                date={getCurrentDate()}
                phoneModel={selectedModal}
                phoneBrand={selectedBrand}
                problemDescription={service}
                totalAmount={pricingData[0]?.price}
              />
            </>
          )}
      </div>
    </div>
  );
};

export default Page;
