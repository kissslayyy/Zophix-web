"use client";
import UserCard from "@/app/(user)/_components/UserCard";
import React from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import router from "next/router";
import OrderTable from "@/components/admin/OrderTable";

const Page = () => {
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
  console.log(user);
  return (
    <section className="m-4 gap-4 ">
      <div className="rounded-2xl flex flex-col items-start  text-black">
        <UserCard user={user} />
      </div>
      <div className=" my-4  p-4 ">
        <div className="w-[960px] ">
          <OrderTable />
        </div>
      </div>
    </section>
  );
};

export default Page;
