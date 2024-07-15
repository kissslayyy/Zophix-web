import Brand from "@/components/home/Brands";
import CTA from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import Offer from "@/components/home/Offer";
import { Review } from "@/components/home/Review";
import { Service } from "@/components/home/Service";
import WhatYouGet from "@/components/home/WhatYouGet";
import { WhyZophix } from "@/components/home/WhyZophix";
export default function Home() {
  return (
    <div className="px-2 lg:px-0">
      <Hero />
      <Service />
      <WhatYouGet />
      <WhyZophix />
      <Brand />
      <Review />
      <Offer />
      <CTA />
    </div>
  );
}
