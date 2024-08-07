import React from "react";
import { TypewriterEffectSmooth } from "../animation/typewriter-effect";

import {
  FaBatteryFull,
  FaCamera,
  FaMobileAlt,
  FaVolumeUp,
} from "react-icons/fa";
import {
  AiOutlineTable,
  AiOutlineTool,
  AiOutlineFileText,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { BiChip } from "react-icons/bi";
import { MotionDiv } from "../animation/MotionDiv";
import AnimPresence from "../animation/AnimPresence";
const NewService = () => {
  const repairs = [
    { icon: <FaMobileAlt />, label: "Screens" },
    { icon: <FaBatteryFull />, label: "Battery" },
    { icon: <FaCamera />, label: "Camera" },
    { icon: <AiOutlineTable />, label: "Back glass" },
    { icon: <AiOutlineCheckCircle />, label: "Face ID" },
    { icon: <FaVolumeUp />, label: "Sound issues" },
    { icon: <BiChip />, label: "Motherboard" },
    { icon: <AiOutlineFileText />, label: "Data recovery" },
    { icon: <AiOutlineTool />, label: "and more!" },
  ];
  const words = [
    {
      text: "Services",
      className:
        "text-black dark:text-black lg:text:3xl xl:text-5xl font-bold text-2xl ",
    },

    {
      text: "offer",
      className:
        " lg:text:3xl text-black dark:text-black xl:text-5xl font-bold text-2xl ",
    },
    {
      text: "at",
      className:
        " lg:text:3xl xl:text-5xl text-black dark:text-black font-bold text-2xl ",
    },
    {
      text: "Zophix.",
      className:
        "text-blue-500 lg:text:3xl xl:text-5xl font-bold text-2xl dark:text-blue-500",
    },
  ];
  const gradual = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <>
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          <TypewriterEffectSmooth words={words} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {repairs.map((repair, index) => (
              <MotionDiv
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: [50, 0] }}
                transition={{
                  duration: 0.5,
                  ease: "easeIn",
                  delay: index * 0.3,
                  viewport: { once: true },
                }}
                key={index}
                className="flex cursor-pointer flex-col items-center bg-white p-6 rounded-lg shadow-md"
              >
                <div className="text-4xl text-blue-500 mb-4">{repair.icon}</div>
                <h3 className="text-lg text-black font-medium">
                  {repair.label}
                </h3>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewService;
