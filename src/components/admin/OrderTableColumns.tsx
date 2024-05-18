"use client";

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

export const adminColumns: ColumnDef<Order>[] = [
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

      return <PopUp blog={blog} />;
    },
  },
];
