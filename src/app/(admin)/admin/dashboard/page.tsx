"use client";
import UserCard from "@/app/(user)/_components/UserCard";
import React from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import router from "next/router";
import OrderTable from "@/components/admin/OrderTable";
import { AddPhoneBrand } from "../_adminComponents/shortcuts/AddPhoneBrand";
import { TotalUser } from "../_adminComponents/shortcuts/TotalUser";
import { TotalOrder } from "../_adminComponents/shortcuts/TotalOrder";
import { AddOrders } from "../_adminComponents/shortcuts/AddOrders";

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
    <section className="m-4 gap-4 flex">
      <div className="rounded-2xl flex flex-col   text-black">
        <div className="flex my-auto gap-4">
          <UserCard user={user} />
          <div className="my-auto"></div>
        </div>

        <div className=" my-4  p-4 ">
          <div className="w-[760px] ">
            <OrderTable title="Latest order" desc="latest 10 order" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <TotalUser />
        <TotalOrder />
        <AddPhoneBrand />
      </div>
    </section>
  );
};

export default Page;
