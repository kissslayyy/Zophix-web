import Image from "next/image";
import React from "react";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50  bg-white/30 dark:bg-black/30  backdrop-blur-lg ">
      <div className="mx-4 my-auto  flex px-4">
        <div className="grid h-24 grid-cols-12 items-center justify-around">
          <div className="col-span-6  lg:col-span-2 ">
            <div className="">
              <Image
                alt="facebook icon"
                width={500}
                height={500}
                className=" lg:object-contain invert dark:invert-0"
                src="https://ucarecdn.com/5e1282d6-c786-4c80-8ced-217daa5fb84d/zophix__com2__pdfio_removebgpreview1.png"
              />{" "}
            </div>
          </div>
          <div className="lg:col-span-8 mx-auto hidden space-x-4 text-lg font-light0 dark:text-white md:block">
            <a href="#">About</a>
            <a href="#">Service</a>
            <a href="#">Contact</a>
          </div>
          <div className=" col-span-2 relative   hidden md:block">
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* <!-- End Navbar with Topbar--> */}
    </nav>
  );
}
