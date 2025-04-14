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
  ImageUpload,
  Feature,
  MapNotit,
  Information,
  ApartmentCategory,
  GeneralInfo,
  ImageCarousel,
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
        <div className="mt-10 border">
          <ImageUpload />
        </div>
        <div>
          <Feature />
        </div>
        <div>
          <MapNotit />
        </div>
        <div>
          <Information />
        </div>
        <div>
          <ApartmentCategory />
        </div>
        <div className="mt-10">
          <GeneralInfo />
        </div>
        <div>
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
}
