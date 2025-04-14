"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const images = [
  { src: "/img1.jpg", alt: "Living Room 1" },
  { src: "/img2.jpg", alt: "Living Room 2" },
  { src: "/img3.jpg", alt: "Living Room 3" },
];

export const ImageCarousel = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="grid grid-cols-3 gap-0 relative">
        {images.map((img, i) => (
          <div key={i} className="relative h-[400px] w-full">
            <Image src={img.src} alt={img.alt} fill className="object-cover" />

            <Button
              size="icon"
              variant="ghost"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
            >
              <ChevronLeft />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
            >
              <ChevronRight />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
