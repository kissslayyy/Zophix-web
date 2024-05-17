"use client";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky top-0  shrink text-white flex   left-0 bg-dashboard-bg h-screen w-[200px] flex-col p-2.5 gap-y-4">
      <div className=" mt-5">
        <Image
          alt="facebook icon"
          width={200}
          height={200}
          className=" lg:object-contain "
          src="https://ucarecdn.com/5e1282d6-c786-4c80-8ced-217daa5fb84d/zophix__com2__pdfio_removebgpreview1.png"
        />{" "}
      </div>
      <div className="flex mt-4 flex-1 flex-col gap-6 ">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          return (
            <>
              <Link
                key={item.route}
                href={item.route}
                className={`${
                  isActive ? "bg-white text-black    rounded-lg  " : ""
                } flex items-center justify-start gap-4 bg-transparent p-2`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert"}`}
                />
                <p
                  className={`max-lg:hidden ${
                    isActive ? "base-bold " : "base-medium"
                  }`}
                >
                  {item.label}
                </p>
              </Link>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSideBar;
