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
import { adminColumns, Order } from "./OrderTableColumns";

export default function OrderTable() {
  const [result, setResult] = useState<Order[]>();
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
  useEffect(() => {
    oderResult();
  }, []);
  console.log(result);
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Past order</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
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
}
