"use client";
import { useState } from "react";
import { adminSidebarLinks, SidebarLink } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <section className="sticky top-0 shrink text-white flex overflow-y-auto left-0 bg-dashboard-bg h-screen w-[260px] flex-col p-2.5 gap-y-4">
      <div className="mt-5">
        <Image
          alt="facebook icon"
          width={200}
          height={200}
          className="lg:object-contain"
          src="https://ucarecdn.com/5e1282d6-c786-4c80-8ced-217daa5fb84d/zophix__com2__pdfio_removebgpreview1.png"
        />
      </div>
      <div className="flex mt-4 flex-1 flex-col gap-6">
        {adminSidebarLinks.map((item) => {
          const isActive = pathname === item.route;

          return (
            <div key={item.route} className="flex flex-col">
              <button
                onClick={() => item.subLinks && toggleDropdown(item.label)}
                className={`flex items-center justify-start gap-4 bg-transparent p-2 ${
                  isActive ? "bg-white text-black rounded-lg" : ""
                }`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert"}`}
                />
                <p className={`max-lg:hidden ${isActive ? "base-bold" : "base-medium"}`}>
                  {item.label}
                </p>
              </button>
              {item.subLinks && openDropdowns[item.label] && (
                <div className="ml-6 mt-2 flex flex-col gap-2">
                  {item.subLinks.map((subLink) => (
                    <Link key={subLink.route} href={subLink.route} className="text-sm">
                      {subLink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SideBar;
