import Image from "next/image";
import { Tabs } from "../animation/tabs";
import { TypewriterEffectSmooth } from "../animation/typewriter-effect";
import { Button } from "../ui/button";

export function Service() {
  const tabs = [
    {
      title: "Service#1",
      value: "screen",
      content: (
        <div className="w-full   overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Service#1</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Service#2",
      value: "battery",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Service#2</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Service#3",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Service#3</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Service#4",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Service#4</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Service#5",
      value: "random",
      content: (
        <div className="w-full  relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Service#5</p>
          <DummyContent />
        </div>
      ),
    },
  ];
  const words = [
    {
      text: "Services",
    },
    {
      text: "we",
    },
    {
      text: "offer",
    },
    {
      text: "at",
    },
    {
      text: "Zophix.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <>
      <div
        className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl 
       lg:mx-auto w-full  items-start justify-start my-40"
      >
        <TypewriterEffectSmooth words={words} />
        <Tabs tabs={tabs} />
      </div>
    </>
  );
}

const DummyContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
      <div className=" my-auto">
        <p className="mt-1  lg:mt-4 text-xs  font-normal lg:font-semibold md:text-lg text-gray-50">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic
          atque tenetur quis eius quos ea neque sunt, accusantium soluta minus
          veniam tempora deserunt? Molestiae eius quidem quam repellat.
        </p>

        <Button className="my-2  bg-blue-500 hover:bg-blue-600">
          Book Now!
        </Button>
      </div>

      <div className="h-64 overflow-hidden rounded-lg sm:h-80  lg:h-full">
        <Image
          alt="service Image"
          height={500}
          width={500}
          src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className=" hidden md:block h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
