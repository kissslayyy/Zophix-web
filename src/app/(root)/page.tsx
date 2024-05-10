import { Hero } from "@/components/home/Hero";
import Offer from "@/components/home/Offer";
import { Service } from "@/components/home/Service";
import { WhyZophix } from "@/components/home/WhyZophix";

export default function Home() {
  return (
    <div className="px-2 lg:px-0">
      <Hero />
      <Offer />
      <Service />
      <WhyZophix />
      <div className="min-h-screen text-white">Hero Section Goes here </div>
    </div>
  );
}
