"use client";

import { Order } from "@/components/admin/OrderTable";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type O = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  issue: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "issue",
    header: "Issue",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
