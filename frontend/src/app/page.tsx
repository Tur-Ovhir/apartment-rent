"use client";

import {
  Caraousel,
  Footer,
  Navbar,
  Card,
  Option,
  RentLevel,
  RentContract,
  Map,
} from "@/components/main";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col ">
        <Navbar />
        <Option />
        <Caraousel />
        <Card />
        <Footer />
        <RentLevel />
        <RentContract />
        <Map />
      </div>
    </div>
  );
}
