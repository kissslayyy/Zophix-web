import React from "react";
import Reveal from "../animation/Reveal";
import { MotionDiv } from "../animation/MotionDiv";

const NewHome = () => {
  return (
    <Reveal>
      <section className=" relative bg-[url(https://ucarecdn.com/faf22bc7-6d40-4b48-874c-2b3ddf222520/professionalusesplasticopenertoolunplugscreencablesfrommotherboardsmarthonedeattachitreplace1.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Reveal>
          <div className="relative text-white mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
            <MotionDiv
              className="max-w-xl text-center sm:text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: [50, 0] }}
              transition={{ duration: 1, ease: "easeIn" }}
            >
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Let us
                <strong className="block font-extrabold text-rose-700">
                  {" "}
                  Fix Your Phone.{" "}
                </strong>
              </h1>

              <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt illo tenetur fuga ducimus numquam ea!
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <a
                  href="/sign-up"
                  className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Get Started
                </a>

                <a
                  href="#"
                  className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  Learn More
                </a>
              </div>
            </MotionDiv>
          </div>
        </Reveal>
      </section>
    </Reveal>
  );
};

export default NewHome;
