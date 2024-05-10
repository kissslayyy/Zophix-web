import { Service } from "@/components/home/Service";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <main className="px-2 lg:px-0">
      <Navbar />
      <div className="min-h-screen text-white">Hero Section Goes here </div>
      <Service />
      <div className="min-h-screen text-white">Hero Section Goes here </div>
    </main>
  );
}
