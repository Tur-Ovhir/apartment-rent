"use client";

import { Caraousel, Footer, Navbar, Card, Map } from "@/components/main";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Caraousel />
      <div className="max-w-[1200px] m-auto">
        <Card isHighlight={true} />
        <Card isHighlight={false} />
        <Map />
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}
