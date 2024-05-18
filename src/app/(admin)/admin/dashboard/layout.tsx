"use client";
import React from "react";
import { Navbar } from "../_adminComponents/Navbar";
import Loading from "@/app/(user)/user/dashboard/loading";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import SideBar from "../_adminComponents/SideBar";
const Layout = ({ children }: { children: React.ReactNode }) => {
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

  if (user?.role === "customer") redirect("/user/dashboard");
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <main className="bg-[#F3F6FF] ">
      <div className="flex">
        <SideBar />
        <section className="w-full   ">
          <Navbar />
          <div className=" w-full rounded-md py-24  text-black">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
