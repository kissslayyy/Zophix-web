import React from "react";
import { Button } from "../ui/button";
import Reveal from "../animation/Reveal";
import { TypewriterEffectSmooth } from "../animation/typewriter-effect";
import Image from "next/image";

export const Hero = () => {
  const words = [
    {
      text: "Let",
    },
    {
      text: "us",
    },
    {
      text: "Fix",
    },
    {
      text: "your",
    },
    {
      text: "Phone.",
      className: "font-extrabold text-blue-500",
    },
  ];
  return (
    <Reveal>
      <main className=" relative overflow-hidden lg:h-screen">
        <div className=" flex relative z-20 items-center overflow-hidden">
          <div className="container mx-auto px-6 flex relative py-16">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
              <span className="w-20 h-2 bg-white mb-12"></span>
              <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white ">
                Let us
                <span className="text-3xl sm:text-5xl">Fix Your Phone</span>
              </h1>
              <p className="text-sm sm:text-base  dark:text-white">
                Dimension of reality that makes change possible and
                understandable. An indefinite and homogeneous environment in
                which natural events and human existence take place.
              </p>
              <div className="flex mt-8">
                <a
                  href="#"
                  className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md"
                >
                  Read more
                </a>
              </div>
            </div>
            <div className=" hidden md:block h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <Image
                alt=""
                width={500}
                height={500}
                src="/heroNew.png"
                className=" h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </Reveal>
  );
};
