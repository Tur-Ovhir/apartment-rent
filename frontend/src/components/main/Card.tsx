"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { OneCard } from "./OneCard";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { ApartmentType } from "@/types";
import { OneCardSkeleton } from "./OneCardSkeleton";

export const Card = ({ isHighlight }: { isHighlight: boolean }) => {
  const [apartments, setApartments] = useState<ApartmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchApartments = async () => {
    try {
      const res = await api.get("/apartment", {
        params: { isHighlight },
      });
      setApartments(res.data.apartments);
    } catch (error) {
      console.log("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handleAll = () => {
    router.push("/apartment");
  };

  return (
    <div className="flex flex-col py-5 m-auto">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">
          {isHighlight ? "Онцлох байр" : "Сүүлд нэмэгдсэн"}
        </h1>
        <Button
          onClick={handleAll}
          className="bg-white border text-black hover:bg-black hover:text-white cursor-pointer"
        >
          Бүгд
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full  justify-center mx-auto mt-2">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <OneCardSkeleton key={index} />
            ))
          : apartments
              .slice(0, 4)
              .map((apartment, index) => (
                <OneCard
                  key={index}
                  id={apartment.id}
                  image={apartment.images[0]}
                  price={apartment.price}
                  title={apartment.title}
                  location={apartment.location}
                  isHighlight={apartment.isHighlight}
                  area={apartment.area}
                  rooms={apartment.rooms}
                  floor={apartment.floor}
                  createdAt={apartment.createdAt}
                />
              ))}
      </div>
    </div>
  );
};
