"use client";

import { Button } from "../ui/button";
import { HiArrowsUpDown } from "react-icons/hi2";
import { OneCard } from "./OneCard";
import { ApartmentType } from "@/types";

interface FeatureCardProps {
  apartments: ApartmentType[];
}
export const FeatureCard = ({ apartments }: FeatureCardProps) => {
  return (
    <div className="flex flex-col mt-6 gap-5 w-full">
      <div className="flex flex-row gap-4 w-full">
        <h1 className="font-bold text-2xl">Сүүлд нэмэгдсэн</h1>
        <Button className="bg-white border text-black hover:text-red-500  cursor-pointer">
          Ухаалаг эрэмбэ <HiArrowsUpDown className="0" />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full  justify-center mx-auto mt-2">
        {apartments.map((apt: ApartmentType) => (
          <OneCard
            key={apt.id}
            id={apt.id}
            image={apt.images[0]}
            price={apt.price}
            title={apt.title}
            location={apt.location}
            isHighlight={apt.isHighlight}
            area={apt.area}
            rooms={apt.rooms}
            floor={apt.floor}
            createdAt={apt.createdAt}
          />
        ))}
      </div>
    </div>
  );
};
