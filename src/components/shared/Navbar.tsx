import React from "react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 hidden bg-black/30  backdrop-blur-lg lg:block ">
      <div className="mx-4 my-auto   px-4">
        <div className="grid h-24 grid-cols-12 items-center justify-between">
          <div className="  col-span-2 ">
            <h1 className="text-2xl font-black text-white">Zophix</h1>
          </div>
          <div className="col-span-8 mx-auto hidden space-x-4 text-lg font-light text-white md:block">
            <a href="#">About</a>
            <a href="#">Service</a>
            <a href="#">Contact</a>
          </div>
          <div className=" col-span-2 hidden md:block">
            <p className="relative mx-auto text-xl text-white font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-75">
              Log-in/Sign-up
            </p>
          </div>
        </div>
      </div>

      {/* <!-- End Navbar with Topbar--> */}
    </nav>
  );
}
