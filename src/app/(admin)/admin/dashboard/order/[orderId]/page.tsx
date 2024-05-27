"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import UserProfileCard from "../../../_adminComponents/order/UserProfileCard";
import { DataTable } from "@/components/shared/DataTable";
import PopUp from "@/components/admin/PopUp";
import { ColumnDef } from "@tanstack/react-table";

interface Customer {
  _id: string;
  name: string;
  email: string;
}

interface Order {
  _id: string;
  issue: string;
  description: string;
  phoneCompany: string;
  phoneModel: string;
  phoneNumber: string;
  customerName: Customer;
  status: string;
  orderAt: string;
  __v: number;
}

interface PageProps {
  params: { orderId: string };
}

export default function Page({ params }: PageProps) {
  const [response, setResponse] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = () => {
    axios
      .get(`/api/get-orders/?orderId=${params.orderId}`)
      .then((res) => {
        setResponse(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [params.orderId]);
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

        // return <PopUp  blog={blog} />;
      },
    },
  ];
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!response || response.length === 0) {
    return <div>No data found for this order.</div>;
  }

  const order = response[0];

  return (
    <div className=" flex">
      <div className="">
        <UserProfileCard />
      </div>
      <div className="">
        <DataTable columns={adminColumns} data={response} />
        <h1>Order Details</h1>
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Issue:</strong> {order.issue}
        </p>
        <p>
          <strong>Description:</strong> {order.description}
        </p>
        <p>
          <strong>Phone Company:</strong> {order.phoneCompany}
        </p>
        <p>
          <strong>Phone Model:</strong> {order.phoneModel}
        </p>
        <p>
          <strong>Phone Number:</strong> {order.phoneNumber}
        </p>
        <p>
          <strong>Customer Name:</strong> {order.customerName.name}
        </p>
        <p>
          <strong>Customer Email:</strong> {order.customerName.email}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.orderAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
