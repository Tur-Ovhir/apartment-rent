"use client";

import Image from "next/image";

export const ImageCarousel = ({ images }: { images: string[] | undefined }) => {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="grid grid-cols-3 gap-0 relative border">
        <div className="relative h-[400px] w-full border">
          <Image
            src={
              images
                ? images[0]
                : "https://res.cloudinary.com/dnpwi1bxt/image/upload/v1737948707/samples/landscapes/architecture-signs.jpg"
            }
            alt="Map preview"
            fill
            className=" object-cover"
          />
        </div>
        <div className="relative h-[400px] w-full border">
          <Image
            src={
              images
                ? images[1]
                : "https://res.cloudinary.com/dnpwi1bxt/image/upload/v1737948707/samples/landscapes/architecture-signs.jpg"
            }
            alt="Map preview"
            fill
            className=" object-cover"
          />
        </div>
        <div className="relative h-[400px] w-full border">
          <Image
            src={
              images
                ? images[2]
                : "https://res.cloudinary.com/dnpwi1bxt/image/upload/v1737948707/samples/landscapes/architecture-signs.jpg"
            }
            alt="Map preview"
            fill
            className=" object-cover"
          />
        </div>
      </div>
    </div>
  );
};
