import Image from "next/image";
import { Tabs } from "../animation/tabs";
import { TypewriterEffectSmooth } from "../animation/typewriter-effect";
import { Button } from "../ui/button";

export function Service() {
  const tabs = [
    {
      title: "Screen ",
      value: "screen",
      content: (
        <div className="w-full   overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Cracked screen?</p>
          <DummyContent
            image="https://ucarecdn.com/997b29d1-34d3-4675-af85-10cefe320fdb/portraitshockedyoungmanshowinghisbrokensmartphone1.jpg"
            content=" Is your phone's once-vibrant display now a spiderweb of cracks? Don't let a shattered screen hinder your productivity or entertainment. Zophix offers expert screen replacement services. We'll quickly and efficiently replace your damaged screen, restoring your phone's crystal-clear clarity and touch responsiveness."
          />
        </div>
      ),
    },
    {
      title: "Battery ",
      value: "battery",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Battery dying fast?</p>
          <DummyContent
            image="https://ucarecdn.com/73b6dd5a-14be-4c81-aeb8-518ea7378a9f/banner_with_phone_charging_black_with_flat_icons.jpg"
            content=" Does your phone constantly beg for a charger, leaving you scrambling for an outlet? Zophix can breathe new life into your device. We'll replace your worn-out battery with a fresh one, ensuring you have lasting power throughout the day. No more worrying about missing important calls or messages because your phone died prematurely."
          />
        </div>
      ),
    },
    {
      title: "Backpanel",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Broken backpanel?</p>
          <DummyContent
            image="https://ucarecdn.com/faf22bc7-6d40-4b48-874c-2b3ddf222520/professionalusesplasticopenertoolunplugscreencablesfrommotherboardsmarthonedeattachitreplace1.jpg"
            content=" We understand that everyday wear and tear can take a toll on your phone's appearance. Scratches and scuffs on the backpanel can make it look dull and worn. At Zophix, we offer backpanel replacement services. We'll restore your phone's sleek and stylish look, making it feel brand new again."
          />
        </div>
      ),
    },
    {
      title: "Charging Point",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Charging issues?</p>
          <DummyContent
            image="https://ucarecdn.com/152f38a9-2cee-4802-ba2a-831fdef5c0e2/7025016.jpg"
            content=" A faulty charging port can be a major inconvenience. It can leave you disconnected from the world and frustrated. Zophix can diagnose and fix charging port issues. Our skilled technicians will get your phone charging properly again, ensuring you can stay connected without any worries."
          />
        </div>
      ),
    },
    {
      title: "Sound",
      value: "random",
      content: (
        <div className="w-full  relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Muffled sound?</p>
          <DummyContent
            image="https://ucarecdn.com/cb12c8fe-a829-49f0-a7c7-e26ddae963bb/Untitleddesign6.jpg"
            content=" Are your calls plagued by muffled speakers or a malfunctioning microphone? Don't let poor audio quality hinder your communication. Zophix can repair your phone's entire audio system. We'll ensure your calls are loud and clear, and you can enjoy crystal-clear audio for music and videos."
          />
        </div>
      ),
    },
  ];
  const words = [
    {
      text: "Services",
      className: " lg:text:3xl xl:text-5xl font-bold text-2xl ",
    },

    {
      text: "offer",
      className: " lg:text:3xl xl:text-5xl font-bold text-2xl ",
    },
    {
      text: "at",
      className: " lg:text:3xl xl:text-5xl font-bold text-2xl ",
    },
    {
      text: "Zophix.",
      className:
        "text-blue-500 lg:text:3xl xl:text-5xl font-bold text-2xl dark:text-blue-500",
    },
  ];
  return (
    <>
      <div
        className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl 
       lg:mx-auto w-full  items-start justify-start my-20 mb-40"
      >
        <TypewriterEffectSmooth words={words} />
        <Tabs tabs={tabs} />
      </div>
    </>
  );
}

const DummyContent = ({
  content,
  image,
}: {
  image: string;
  content: string;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
      <div className=" my-auto">
        <p className="mt-1 line-clamp-4 md:line-clamp-none  text-xs  font-thin lg:font-medium md:text-lg text-gray-50">
          {content}
        </p>

        <Button className="my-2  ">Book Now!</Button>
      </div>

      <div className="h-64 overflow-hidden rounded-lg sm:h-80  lg:h-full">
        <Image
          alt="service Image"
          height={500}
          width={500}
          src={image}
          className=" hidden md:block h-full w-full object-contain"
        />
      </div>
    </div>
  );
};
