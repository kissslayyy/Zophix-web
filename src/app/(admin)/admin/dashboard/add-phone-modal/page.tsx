"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

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
import { DataTable } from "@/components/shared/DataTable";
import { toast } from "sonner";
import { APiResponse } from "@/types/apiResponse";

export type Order = {
  id: string;
  _id: string;
  status: "pending" | "processing" | "success" | "failed";
  Phone: string;
  issue: string;
  name: string;
  action: any;
  serviceSlug: string;
  phoneCompany: string;
  phoneModal: string;
};

const FormSchema = z.object({
  phoneModal: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function AddPhoneModal() {
  const [serviceData, setServiceData] = useState<Order[]>();
  const [modalNames, setModalNames] = useState<Order[]>();
  const [selectedBrand, setSelectedBrand] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneModal: "",
    },
  });
  const getPhoneModal = (id: string) => {
    setSelectedBrand(id);
    axios
      .get(`/api/phone-modal/?brand=${id}`)
      .then((response) => {
        setModalNames(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteService = (id: string) => {
    axios
      .delete(`/api/phone-modal`, { data: { id } })
      .then((response) => {
        toast.success(response.data.message);

        getPhoneModal(selectedBrand!);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getService = () => {
    axios
      .get(`/api/phone-company`)
      .then((response) => {
        setServiceData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const serviceColumns: ColumnDef<Order>[] = [
    {
      id: "phoneModal",
      accessorKey: "phoneModal",
      header: "Name",
    },
    {
      id: "Action",
      cell: ({ row }) => {
        const { _id } = row.original;
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="delete">Delete</Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  service
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  variant="delete"
                  onClick={() => deleteService(_id)}
                  className="bg-red-500"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/phone-modal/`, {
        phoneModal: values.phoneModal,
        brand: selectedBrand,
      });
      toast.success(response.data.message);
      setIsSubmitting(false);
      getPhoneModal(selectedBrand!);
      form.reset();
    } catch (error) {
      console.error("Error while adding service", error);
      setIsSubmitting(false);
      toast.error("Adding service failed");
    }
  };
  useEffect(() => {
    getService();
  }, []);

  return (
    <section className="flex justify-center px-4 my-auto gap-4 flex-row-reverse">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Phone Models</CardTitle>
            <CardDescription>
              Available phone models from your store.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {modalNames && (
            <DataTable
              data={modalNames.toReversed()}
              columns={serviceColumns}
            />
          )}
        </CardContent>
      </Card>
      <Card className="w-full h-fit">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Add new phone modal</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                {serviceData &&
                  serviceData.map((e, i) => {
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
              <FormField
                control={form.control}
                name="phoneModal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Modal</FormLabel>
                    <FormControl>
                      <Input placeholder="Add modal name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} variant="update" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
