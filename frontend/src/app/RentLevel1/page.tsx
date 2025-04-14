"use client";
import {
  ApartmentCategory,
  Feature,
  ImageUpload,
  Information,
  MapNotit,
  Navbar,
  RentLevel,
} from "@/components/main";
import { Button } from "@/components/ui/button";
export default function RentLevel1Page() {
  return (
    <div className="flex flex-col gap-3">
      <Navbar />
      <RentLevel />
      <ApartmentCategory />
      <Information />
      <div className="flex justify-center">
        <MapNotit />
      </div>

      <ImageUpload />
      <div className="flex justify-center">
        <Feature />
      </div>

      <div className="flex justify-center mt-5">
        <Button className="border bg-red-500 hover:bg-red-800 text-black">
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
}
