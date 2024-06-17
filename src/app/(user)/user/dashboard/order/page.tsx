"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import Loading from "../loading";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/components/admin/OrderTable";
import { DataTable } from "@/components/shared/DataTable";
import { get } from "mongoose";

const Page = () => {
  const [result, setResult] = useState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/sign-in");
    },
  });
  console.log(session);
  console.log(status);
  const user: User = session?.user;
  const getCustomerOrder = () => {
    setIsLoading(true);
    axios
      .get(`/api/get-customer-order/?customerId=${user._id}`)
      .then((response) => {
        setResult(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getCustomerOrder();
  }, []);
  const adminColumns: ColumnDef<Order>[] = [
    {
      id: "Name",
      accessorKey: "phoneCompany",
      header: "Name",
    },

    {
      id: "Phone",
      accessorKey: "phoneModel",
      header: "Phone",
    },
    {
      id: "Issue",
      accessorKey: "issue",
      header: "Issue",
    },
    {
      id: "Price",
      accessorKey: "price",
      header: "Price",
    },
    {
      id: "Status",
      accessorKey: "status",
      header: "Status",
    },
  ];
  if (user?.role === "admin") redirect("/admin/dashboard");
  if (status === "loading" || isLoading) {
    return <Loading />;
  }
  console.log(result);
  return (
    <div className="">
      <Card className=" xl:col-span-2">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Total Order</CardTitle>
            <CardDescription>Your total past order</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {result && <DataTable data={result} columns={adminColumns} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
