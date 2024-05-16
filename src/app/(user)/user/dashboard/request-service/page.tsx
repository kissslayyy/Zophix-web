"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      redirect("/sign-in");
    },
  });
  console.log(session);
  const user: User = session?.user;
  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  return (
    <div>
      <h1 className="">Ask a question</h1>
      <div className="">{JSON.stringify(user._id)}</div>
    </div>
  );
};

export default Page;
