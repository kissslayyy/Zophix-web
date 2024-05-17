"use client";
import React from "react";

import UserCard from "../../_components/UserCard";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import Loading from "./loading";
import { Payment, columns } from "../../_components/columns";
import { DataTable } from "@/components/shared/DataTable";

const Page = () => {
  const router = useRouter();

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

  if (user?.role === "admin") redirect("/admin/dashboard");
  if (status === "loading") {
    return <Loading />;
  }
  const payments: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      issue: "battery damage",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      issue: "screen damage",

      email: "example@gmail.com",
    },
    // ...
  ];
  return (
    <section className="m-4 gap-4 ">
      <div className="rounded-2xl flex flex-col items-start  text-black">
        <UserCard user={user} />
      </div>
      <div className=" my-4  p-4 ">
        <h3 className="text-2xl font-semibold pb-1">Past Services</h3>
        <div className="w-[960px] ">
          <DataTable columns={columns} data={payments} />
        </div>
      </div>
    </section>
  );
};

export default Page;
