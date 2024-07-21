import React from "react";
import { Button } from "../ui/button";
import Reveal from "../animation/Reveal";
import { MotionDiv, MotionHeading } from "../animation/MotionDiv";
import Image from "next/image";

const images: string[] = [
  "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png",
  "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png",
  "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png",
];

const About: React.FC = () => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <Reveal>
      <section className="bg-white/80 dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <MotionDiv
            className="font-light text-gray-500 sm:text-lg dark:text-gray-400"
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, ease: "easeIn" }}
            variants={defaultVariants}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              About
            </h3>
            <p className="mb-4">
              At Zophix, we believe that technology should empower, not hinder.
              As a leading provider of electronic gadget repair services, our
              mission is to make the repair process as seamless and stress-free
              as possible. Whether your device is a smartphone, tablet, laptop,
              or any other gadget, we have the expertise and network to get it
              back in perfect working condition.
            </p>
            <p>
              <span className="block text-2xl font-semibold">Our Story</span>
              Founded with a vision to simplify gadget repairs, Zophix has
              quickly grown to become a trusted name in the industry. We
              recognized the frustration and inconvenience that comes with
              broken devices and set out to create a solution that prioritizes
              customer convenience, quality, and trust.
            </p>
            <Button className="mt-4">Read more</Button>
          </MotionDiv>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 50, x: 100 }}
                whileInView={{ opacity: 1, x: [100, 0] }}
                transition={{ duration: index * 1, ease: "linear" }}
                viewport={{ once: true }}
              >
                <Image
                  width={300}
                  height={300}
                  className={`w-full rounded-lg ${
                    index > 0 ? "mt-4 lg:mt-10" : ""
                  }`}
                  src={image}
                  alt={`office content ${index + 1}`}
                />
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
};

export default About;
