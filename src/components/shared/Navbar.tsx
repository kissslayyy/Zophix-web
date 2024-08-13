"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Loader2Icon } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg">
      <div className="mx-4 my-auto flex px-4">
        <div className="grid h-24 grid-cols-12 items-center justify-around">
          <div className="col-span-6 lg:col-span-2">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
              <Image
                alt="logo"
                width={500}
                height={500}
                className="lg:object-contain"
                src="https://ucarecdn.com/5e1282d6-c786-4c80-8ced-217daa5fb84d/zophix__com2__pdfio_removebgpreview1.png"
              />
            </div>
          </div>
          <div className="lg:col-span-8 mx-auto hidden space-x-4 text-lg font-light text-white md:block">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="lg:col-span-2 col-span-6 relative text-white">
            <div className="flex justify-end lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="link">
                    <HamburgerMenuIcon className="text-gray-100 my-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/about">About</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/services">Services</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/contact">Contact</Link>
                  </DropdownMenuItem>
                  {user ? (
                    <DropdownMenuItem>
                      <Link href="/user/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem>
                        <Link href="/sign-up">Sign Up</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/sign-in">Log In</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="md:flex gap-2 hidden">
              {status === "loading" ? (
                <Loader2Icon className="animate-spin" />
              ) : user ? (
                <Button asChild>
                  <Link href="/user/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Link href="/sign-up">Sign Up</Link>
                  <Link href="/sign-in">Log In</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
