"use client";
import React, { useEffect, useState } from "react";

import UserCard from "../../_components/UserCard";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import Loading from "./loading";
import { DataTable } from "@/components/shared/DataTable";
import axios from "axios";
import { Order } from "@/components/admin/OrderTable";
import { ColumnDef } from "@tanstack/react-table";
import PopUp from "@/components/admin/PopUp";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [result, setResult] = useState<Order[] | undefined>([]);
  const oderResult = () => {
    axios
      .get("/api/get-orders")
      .then((response) => {
        setResult(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const router = useRouter();
  useEffect(() => {
    oderResult();
  }, []);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/sign-in");
    },
  });
  console.log(session);
  console.log(status);
  const adminColumns: ColumnDef<Order>[] = [
    {
      id: "Name",
      accessorKey: "customerName.name",
      header: "Name",
    },

    {
      id: "Phone",
      accessorKey: "phoneNumber",
      header: "Phone",
    },
    {
      id: "Issue",
      accessorKey: "issue",
      header: "Issue",
    },
    {
      id: "Status",
      accessorKey: "status",
      header: "Status",
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const blog = row.original;

        return (
          <>
          <Button>
          Download
          </Button>
          </>
        );
      },
    },
  ];
  const user: User = session?.user;

  if (user?.role === "admin") redirect("/admin/dashboard");
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <section className="m-4 gap-4 ">
      <div className="rounded-2xl flex flex-col items-start  text-black">
        <UserCard user={user} />
      </div>
      <div className=" my-4  p-4 ">
        <h3 className="text-2xl font-semibold pb-1">Past Services</h3>
        <div className="w-[960px] ">
          {result && <DataTable columns={adminColumns} data={result} />}
        </div>
      </div>
    </section>
  );
};

export default Page;
