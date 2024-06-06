"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "../shared/DataTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import PopUp from "./PopUp";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  status: "pending" | "processing" | "success" | "failed";
  Phone: string;
  issue: string;
  name: string;
  action: any;
};

const OrderTable = ({ title, desc }: { title: string; desc: string }) => {
  const [result, setResult] = useState<Order[]>();
  const oderResult = () => {
    axios
      .get(`/api/get-orders`)
      .then((response) => {
        setResult(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    oderResult();
  }, []);
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

        return <PopUp oderResult={oderResult} blog={blog} />;
      },
    },
  ];

  // console.log(result);
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {result && <DataTable data={result} columns={adminColumns} />}
      </CardContent>
    </Card>
  );
};
export default OrderTable;
