"use client";

import {
  Caraousel,
  Footer,
  Navbar,
  Card,
  Option,
  RentContract,
  Map,
  ImageUpload,
  Feature,
  MapNotit,
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
        <RentContract />
        <Map />
        <div className="mt-10 border">
          <ImageUpload />
        </div>
        <div>
          <Feature />
        </div>
        <div>
          <MapNotit />
        </div>
      </div>
    </div>
  );
}
