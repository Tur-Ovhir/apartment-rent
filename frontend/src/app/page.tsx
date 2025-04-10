"use client";

import { Caraousel, Footer, Navbar, Card, Option } from "@/components/main";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col ">
        <Navbar />
        <Option />
        <Caraousel />
        <Card />
        <Footer />
      </div>
    </div>
  );
}
