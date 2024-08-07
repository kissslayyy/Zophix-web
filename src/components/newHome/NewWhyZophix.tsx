import React from "react";
import { MdOutlineLocalConvenienceStore } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { PiCertificate } from "react-icons/pi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import Image from "next/image";
import Reveal from "../animation/Reveal";
import { MotionDiv } from "../animation/MotionDiv";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <MdOutlineLocalConvenienceStore className="h-auto w-16 " />,
    title: "Comprehensive Convenience",
    description:
      "Zophix offers a one-stop solution for all your electronic gadget repair needs. Whether you prefer in-store, pick-up & drop-off, or doorstep repair services, we have you covered. Our platform simplifies the entire repair process, making it easy and hassle-free.",
  },
  {
    icon: <VscWorkspaceTrusted className="h-auto w-16 " />,
    title: "Transparency and Trust",
    description:
      "With Zophix, you can view upfront pricing and track the repair progress in real-time. This level of transparency ensures that you know exactly what you’re paying for and how long the repair will take, building trust and confidence in our services.",
  },
  {
    icon: <PiCertificate className="h-auto w-16 " />,
    title: "Quality Assurance",
    description:
      "Our repairs are performed by trained technicians using genuine parts. This commitment to quality ensures that your gadgets are repaired to the highest standards, giving you peace of mind.",
  },
  {
    icon: <RiCustomerService2Line className="h-auto w-16 " />,
    title: "Exceptional Customer Service",
    description:
      "From the moment you book a repair to the delivery of your fixed gadget, our focus is on providing a seamless and efficient customer experience. Our dedicated customer support team is always ready to assist you.",
  },
];

const NewWhyZophix: React.FC = () => {
  return (
    <Reveal>
      <div className="w-full bg-gray-100 text-gray-700">
        <div className="mx-auto py-10 px-4 gap-2 w-full lg:max-w-7xl grid grid-cols-1 lg:grid-cols-2">
          <div className="order-2  lg:order-1  lg:row-span-2 relative w-full hidden md:block">
            <Image
              width={500}
              height={500}
              src="https://ucarecdn.com/3824111c-d5d9-4df3-b107-3e78c3881b7f/undraw_choice_re_2hkp.svg"
              alt=""
              className="absolute top-0 left-0  w-auto lg:h-full object-contain"
            />
          </div>
          <MotionDiv
            className=" lg:order-2  md:col-span-1 col-span-full  row-span-1 mb-8 w-full space-y-4 text-start "
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1, x: [0, 50] }}
            transition={{ duration: 1, ease: "easeIn" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold">
              Why Choose Us?
            </h2>
            <p className="text-sm">
              Zophix offers unparalleled convenience with a comprehensive
              platform for all your electronic gadget repair needs. Our wide
              network of trusted, certified partners ensures reliable,
              high-quality repairs using genuine parts. With transparent
              pricing, real-time repair tracking, and secure payment options, we
              build trust and provide peace of mind. Our commitment to
              exceptional customer service and value-added services like
              expedited repairs and extended warranties make Zophix the smart
              choice for hassle-free gadget repairs. Experience the Zophix
              difference today and enjoy seamless, efficient, and trustworthy
              repair services.
            </p>
          </MotionDiv>
          <div className="order-3 col-span-full lg:col-span-1 row-span-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-6">
            {/* :FEATURES */}
            {features.map((feature, index) => (
              <Reveal key={index}>
                <div className="flex flex-col lg:flex-row">
                  <span className="flex-shrink-0 mx-auto lg:mx-0 p-2 w-full sm:w-auto max-w-xs inline-flex justify-center items-center rounded-xl ">
                    {feature.icon}
                    <dt className="ml-2 sm:hidden text-black font-semibold">
                      {feature.title}
                    </dt>
                  </span>
                  <div className="lg:ml-4 mx-auto max-w-sm inline-flex flex-col text-center lg:text-left">
                    <dt className="hidden sm:block font-semibold">
                      {feature.title}
                    </dt>
                    <dd className="mt-2 text-sm">{feature.description}</dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default NewWhyZophix;
