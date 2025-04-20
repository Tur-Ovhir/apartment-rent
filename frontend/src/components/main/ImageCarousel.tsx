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
                : "https://res.cloudinary.com/dykm0aphm/image/upload/v1744442469/Screenshot_2025-04-12_at_13.56.12_vupomr.png"
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
                : "https://res.cloudinary.com/dykm0aphm/image/upload/v1744442469/Screenshot_2025-04-12_at_13.56.12_vupomr.png"
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
                : "https://res.cloudinary.com/dykm0aphm/image/upload/v1744442469/Screenshot_2025-04-12_at_13.56.12_vupomr.png"
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
