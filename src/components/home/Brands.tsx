import { cn } from "@/lib/utils";
import Marquee from "@/components/animation/Marquee";
import Image from "next/image";
import { TypewriterEffectSmooth } from "../animation/typewriter-effect";
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "Samsung.",
    img: "https://ucarecdn.com/8a99d91d-8e10-43a6-88e3-5d5aaa4ada67/406a512de8dd.jpg",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "Apple.",
    img: "https://ucarecdn.com/a3d5579f-f90a-4bdd-a97a-605123c7883a/2e7cdc225a5f.jpg",
  },
  {
    name: "John",
    username: "@john",
    body: "MI",
    img: "https://ucarecdn.com/72bb4edd-308f-44cb-81bc-6c73afd72a23/cb96df6e080f.jpg",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Realme",
    img: "https://ucarecdn.com/41a378b9-836d-4026-868c-9abee9613bec/0124cc453a6c.jpg",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "Motorola",
    img: "https://ucarecdn.com/f5bcb3d6-622b-45cd-9cdb-bdc07440aecd/1dcd7fda0141.jpg",
  },
  {
    name: "James",
    username: "@james",
    body: "Nokia.",
    img: "https://ucarecdn.com/5de215fe-91cc-4f81-a90d-b6e027d6683d/fef4e5ae6507.jpg",
  },
  {
    name: "James",
    username: "@james",
    body: "OnePlus",
    img: "https://ucarecdn.com/8498c2e7-6d88-4046-b2f1-86c11763d364/dfb6c340010f.jpg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row  justify-center gap-2">
        <Image
          className="rounded-full size-24 p-2 object-center object-scale-down bg-white"
          width={100}
          height={100}
          alt=""
          src={img}
        />
      </div>
      <blockquote className="mt-2 text-center text-sm">{body}</blockquote>
    </figure>
  );
};

const Brand = () => {
  const words = [
    {
      text: "Brand",
      className: "lg:text:3xl xl:text-5xl font-bold text-2xl dark:",
    },
    {
      text: "We",
      className: "lg:text:3xl xl:text-5xl font-bold text-2xl dark:",
    },

    {
      text: "Serve.",
      className:
        "text-blue-500 lg:text:3xl xl:text-5xl font-bold text-2xl dark:text-blue-500",
    },
  ];
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl">
      <TypewriterEffectSmooth words={words} />

      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r dark:from-black dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l dark:from-black dark:from-background"></div>
    </div>
  );
};

export default Brand;
