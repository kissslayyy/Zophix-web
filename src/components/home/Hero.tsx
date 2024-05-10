import React from "react";
import { Button } from "../ui/button";
import Reveal from "../animation/Reveal";
import { TypewriterEffectSmooth } from "../animation/typewriter-effect";

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
      <section className="relative bg-[url(https://ld-wp73.template-help.com/wordpress/prod_30970/v1/wp-content/uploads/2021/05/home.png)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-r bg-black/5  sm:from-black/95 sm:to-white/0 "></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-start ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              <TypewriterEffectSmooth words={words} />
              {/* <strong className="block font-extrabold text-purple-700">
                {" "}
                Phone Forever .{" "}
              </strong> */}
            </h1>
            <Reveal>
              <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt illo tenetur fuga ducimus numquam ea!
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Book Your slot Now
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Reveal>
  );
};
