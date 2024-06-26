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
};

const FormSchema = z.object({
  phoneCompany: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function AddPhoneBrand() {
  const [serviceData, setServiceData] = useState<Order[]>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneCompany: "",
    },
  });

  const deleteService = (id: string) => {
    axios
      .delete(`/api/phone-company`, { data: { id } })
      .then((response) => {
        toast.success(response.data.message);
        getService();
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
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const serviceColumns: ColumnDef<Order>[] = [
    {
      id: "phoneCompany",
      accessorKey: "phoneCompany",
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

  useEffect(() => {
    getService();
  }, []);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<APiResponse>(
        `/api/phone-company`,
        values
      );
      toast.success(response.data.message);
      getService();
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error while adding service", error);
      setIsSubmitting(false);
      toast.error("Adding service failed");
    }
  };

  return (
    <section className="flex justify-center px-4 my-auto gap-4 flex-row-reverse">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle className="font-normal">Total modal </CardTitle>
            <CardDescription>Available modal from your store.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {serviceData && (
            <DataTable data={serviceData} columns={serviceColumns} />
          )}
        </CardContent>
      </Card>
      <Card className="w-full h-fit">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle> Phone Brand/Company</CardTitle>
            <CardDescription>Add brand/company.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="phoneCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Brand/Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Add Phone Brand/Company" {...field} />
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
