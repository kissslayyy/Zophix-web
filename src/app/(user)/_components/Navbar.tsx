"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut, getProviders } from "next-auth/react";
import { User } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Bell, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
export const Navbar = () => {
  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  };
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(getDate());

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

  if (user?.role === "admin") {
    redirect("/admin/dashboard");
  }
  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  return (
    <header className="bg-dashboard-bg w-full fixed z-50">
      <div className="max-w-6xl px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-around">
          <div className="flex-1  text-center sm:text-left">
            <h1 className="text-base font-bold text-gray-100 sm:text-lg">
              Welcome Back
            </h1>
          </div>

          <div className="flex gap-6">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">
                  <Bell className="my-auto" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-white text-black">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@Notification</h4>
                    <p className="text-sm">No new Notification</p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        {currentDate}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <button
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
              onClick={() => signOut()}
            >
              Log-Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
