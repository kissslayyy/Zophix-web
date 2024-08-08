import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default RootLayout;
