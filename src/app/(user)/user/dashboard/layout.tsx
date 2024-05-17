"use client";
import LeftSideBar from "../../_components/LeftSideBar";
import { Navbar } from "../../_components/Navbar";
import React from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import Loading from "./loading";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <main className="bg-[#F3F6FF] relative">
      <div className="flex">
        <LeftSideBar />
        <section className="w-full min-h-screen  ">
          <Navbar />
          <div className=" w-full rounded-md py-24  text-black">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
