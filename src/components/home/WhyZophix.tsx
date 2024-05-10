import React from "react";
import { StickyScroll } from "../animation/sticky-scroll-reveal";
import Image from "next/image";
import { TypewriterEffectSmooth } from "../animation/typewriter-effect";

const content = [
  {
    title: "Premium Repair",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Premium Repair
      </div>
    ),
  },
  {
    title: "Instant Mobile Repair",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        Instant Mobile Repair
      </div>
    ),
  },
  {
    title: "Physical Protection Warranty",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Physical Protection Warranty
      </div>
    ),
  },
  {
    title: "Skilled Technicians",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Skilled Technicians
      </div>
    ),
  },
];
const words = [
  {
    text: "Why",
    className: "lg:text:3xl xl:text-5xl font-bold text-3xl dark:",
  },
  {
    text: "choose",
    className: "lg:text:3xl xl:text-5xl font-bold text-3xl dark:",
  },

  {
    text: "Zophix.",
    className:
      "text-blue-500 lg:text:3xl xl:text-5xl font-bold text-3xl dark:text-blue-500",
  },
];
export function WhyZophix() {
  return (
    <div className="flex flex-col max-w-5xl lg:mx-auto w-full  items-start justify-between">
      <TypewriterEffectSmooth words={words} />
      <StickyScroll content={content} />
    </div>
  );
}
