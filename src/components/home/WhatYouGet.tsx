"use client";
import { ArrowUpIcon, User2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { GrUserExpert } from "react-icons/gr";
import { AiOutlineApartment } from "react-icons/ai";
import { RiCustomerService2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import Reveal from "../animation/Reveal";
const features = [
  {
    id: 1,
    title: "Expertise",
    description:
      "Our team has years of experience in repairing all types of mobile devices. Trust us to fix your phone quickly and efficiently.",
    icon: <GrUserExpert className="w-10 h-10 text-center text-blue-300" />,
    borderColor: "border-gray-100",
    bgColor: "",
    initial: "hidden",
  },
  {
    id: 2,
    title: "Fast Service",
    description:
      "We offer same-day repairs for most issues. Get your phone back in no time with our quick and reliable service.",
    icon: <RiCustomerService2Line className="w-10 h-10 text-white" />,
    borderColor: "border-blue-300",
    bgColor: "bg-blue-300",
    initial: "right",
  },
  {
    id: 3,
    title: "Quality Parts",
    description:
      "We use only high-quality parts for all our repairs, ensuring your phone works like new again.",
    icon: <AiOutlineApartment className="w-10 h-10 text-blue-300" />,
    borderColor: "border-gray-100",
    bgColor: "",
    initial: "hidden",
  },
  {
    id: 4,
    title: "Customer Support",
    description:
      "Our customer support team is available 24/7 to answer any questions and provide assistance whenever you need it.",
    icon: <User2 className="w-10 h-10 text-white" />,
    borderColor: "border-blue-300",
    bgColor: "bg-blue-300",
    initial: "right",
  },
];

const WhatYouGet: React.FC = () => {
  const MULTIDIRECTION_SLIDE_VARIANTS = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };

  return (
    <Reveal>
      <div className="relative mx-auto py-24 w-full  bg-black text-white">
        {/* Background Image */}
        <Image
          src="https://ucarecdn.com/5aaf36f1-b2e1-4dc3-a59d-90cc9bf17ce3/sideviewsmartphonebeingdisinfectedwithcopyspace.jpg"
          alt="Background"
          width={500}
          height={500}
          className="absolute top-0 left-0 w-full h-full object-cover object-left opacity-50"
        />

        {/* Main Container */}
        <div className="relative w-full flex flex-col lg:flex-row items-center">
          {/* Title Container */}
          <motion.div
            className="flex-shrink-0 mx-auto mb-10 px-4 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={MULTIDIRECTION_SLIDE_VARIANTS}
            transition={{ duration: 1 }}
          >
            {/* Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl text-white text-opacity-80 font-rubik tracking-wider space-y-3">
              <span className="block">
                Get Right <b className="text-white">Solutions</b>
              </span>
              <span className="block">
                for your <b className="text-white">Phone</b>
              </span>
            </h2>
            {/* Bottom line */}
            <span className="mt-5 mx-auto lg:mx-0 w-32 h-1.5 block rounded-3xl bg-white" />
          </motion.div>

          {/* Features Container */}
          <div className="flex-grow-0 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {features.map((feature) => (
              <motion.div
                initial={feature.initial}
                animate="visible"
                variants={MULTIDIRECTION_SLIDE_VARIANTS}
                transition={{ duration: 1 }}
                key={feature.id}
                className={`mx-auto py-5 px-2.5 w-full flex flex-col justify-center items-center space-y-2 rounded-sm border-2 ${feature.borderColor} bg-black bg-opacity-80 text-center`}
              >
                {/* Icon */}
                <span
                  className={`w-14 h-14 inline-flex justify-center items-center rounded-full ${feature.bgColor}`}
                >
                  {feature.icon}
                </span>
                {/* Feature name */}
                <dt className="lg:text-lg font-rubik font-bold uppercase tracking-widest">
                  {feature.title}
                </dt>
                {/* Description */}
                <dd className="py-2 text-xs lg:text-sm text-gray-50 text-opacity-60">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default WhatYouGet;
