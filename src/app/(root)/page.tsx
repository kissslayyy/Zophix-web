import Brand from "@/components/home/Brands";
import CTA from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import NewHome from "@/components/newHome/NewHome";
import Offer from "@/components/home/Offer";
import { Review } from "@/components/home/Review";
import { Service } from "@/components/home/Service";
import WhatYouGet from "@/components/home/WhatYouGet";
import { WhyZophix } from "@/components/home/WhyZophix";
import NewWhyZophix from "@/components/newHome/NewWhyZophix";
import About from "@/components/newHome/About";
import NewService from "@/components/newHome/NewService";
export default function Home() {
  return (
    <div className="px-2 lg:px-0">
      <NewHome />
      <NewWhyZophix />
      <About />
      <NewService />
      <WhatYouGet />
      <Brand />
      <Review />
      <CTA />
    </div>
  );
}
