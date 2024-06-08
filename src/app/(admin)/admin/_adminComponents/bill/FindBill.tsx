"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import BillCard from "./BillCard";
import { Loader2 } from "lucide-react";
import EmptySearch from "@/components/shared/EmptySearch";

interface Order {
  _id: string;
  customerName: {
    name: string;
    email: string;
  };
  status: string;
  phoneCompany: string;
  phoneModel: string;
  issue: string;
}

const FindBill = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    if (phoneNumber.trim().length === 0) {
      return null;
    }
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/get-orders-by-number?phoneNumber=${phoneNumber}`
      );
      const result = await response.json();

      if (response.ok) {
        setOrders(result.data);
      } else {
        setError(result.message || "Failed to fetch orders");
      }
    } catch (err) {
      setError("An error occurred while fetching the orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="">
        <Card className="w-full h-fit">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle> Generate Bill</CardTitle>
              <CardDescription>Search By mobile numbers.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="flex gap-2" onSubmit={handleSearch}>
              <Input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-max outline-none focus:outline-none focus:ring-0"
              />
              <Button variant="update" type="submit">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>
        {loading && (
          <div className="flex justify-center h-screen items-start">
            <Loader2 className="size-16 animate-spin" />
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {orders.length > 0 ? (
          <div className="m-4">
            {orders.map((order) => (
              <BillCard
                key={order._id}
                _id={order._id}
                name={order.customerName.name}
                email={order.customerName.email}
                status={order.status}
                phoneCompany={order.phoneCompany}
                phoneModel={order.phoneModel}
                issue={order.issue}
              />
            ))}
          </div>
        ) : (
          <>
            <EmptySearch />
          </>
        )}
      </div>
    </div>
  );
};

export default FindBill;
