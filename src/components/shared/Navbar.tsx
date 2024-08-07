import Image from "next/image";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50  bg-black/90  backdrop-blur-lg ">
      <div className="mx-4 my-auto  flex px-4">
        <div className="grid h-24 grid-cols-12 items-center justify-around">
          <div className="col-span-6  lg:col-span-2 ">
            <div className="">
              <Image
                alt="facebook icon"
                width={500}
                height={500}
                className=" lg:object-contain"
                src="https://ucarecdn.com/5e1282d6-c786-4c80-8ced-217daa5fb84d/zophix__com2__pdfio_removebgpreview1.png"
              />{" "}
            </div>
          </div>
          <div className="lg:col-span-8 mx-auto hidden space-x-4 text-lg font-light0 text-white md:block">
            <a href="#">About</a>
            <a href="#">Service</a>
            <a href="#">Contact</a>
          </div>
          <div className=" col-span-2 relative    hidden md:block">
            <div className="flex gap-2">
              <Link href={"/sign-up"}>Sign Up</Link>
              <Link href={"/sign-up"}>Login in</Link>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- End Navbar with Topbar--> */}
    </nav>
  );
}
