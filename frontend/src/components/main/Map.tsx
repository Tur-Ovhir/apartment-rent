"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const Map = () => {
  return (
    <div className=" items-center justify-center bg-white rounded-2xl shadow-md  flex flex-row  gap-10 border border-black">
      <div className="space-y-4 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Газрын зураг дээрээс мөрөөдлийн байраа хайгаарай
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Байршлын мэдээллийн дагуу хайж буй байшингаа хялбархан олоорой.
        </p>
        <Link href="https://www.google.com/maps/place/Ulaanbaatar/@47.8917624,106.7370651,43875m/data=!3m2!1e3!4b1!4m6!3m5!1s0x5d96925be2b18aab:0xe606927864a1847f!8m2!3d47.9220509!4d106.9155007!16zL20vMGhxa2c?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D">
          <Button className="bg-red-600 hover:bg-red-700 text-white w-fit">
            Газрын зураг дээр хайх
          </Button>
        </Link>
      </div>
      <div className="flex justify-center mt-10">
        <Image
          src="https://res.cloudinary.com/dykm0aphm/image/upload/v1744444071/Screenshot_2025-04-12_at_15.47.34_irlwad.png"
          alt="Phone with map"
          width={400}
          height={300}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
};
