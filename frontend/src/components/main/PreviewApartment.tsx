"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { GeneralInfo } from "./GeneralInfo";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";
import { ApartmentType } from "@/types";
import { Card, CardContent } from "../ui/card";

type PreviewApartmentProps = {
  step: number;
  apartmentId: number | undefined;
  setStep: Dispatch<SetStateAction<number>>;
};

export const PreviewApartment = ({
  step,
  setStep,
  apartmentId,
}: PreviewApartmentProps) => {
  const [apartment, setApartment] = useState<ApartmentType>();
  const fetchApartment = async () => {
    try {
      const res = await api.get(`/apartment/${apartmentId}`);
      setApartment(res.data.apartment);
    } catch (error) {
      console.log("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    fetchApartment();
  }, [apartmentId]);

  return (
    <div className="space-y-5">
      <ImageCarousel images={apartment?.images} />
      <div className="mt-10">
        <GeneralInfo apartment={apartment} />
      </div>
      <Card className="w-[900px] mx-auto p-6 shadow-lg rounded-2xl border border-gray-200">
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Дэлгэрэнгүй</h2>
          <p className="text-muted-foreground">{apartment?.description}</p>
        </CardContent>
      </Card>
      <Card className="w-[900px] mx-auto p-6 shadow-lg rounded-2xl border border-gray-200">
        <CardContent className="flex gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">
              Интерьерийн онцлог
            </h2>
            {apartment?.interiorCategory?.split(",").map((item, index) => (
              <p
                key={index}
                className="text-muted-foreground flex items-center gap-1"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_37_681)">
                    <path
                      d="M9.88771 1.31939C9.73424 1.16048 9.48102 1.15608 9.32212 1.30955C9.31879 1.31276 9.31551 1.31604 9.31227 1.31939L2.79508 7.8366L0.677882 5.7194C0.518976 5.56593 0.265758 5.57034 0.112289 5.72924C-0.0374297 5.88426 -0.0374297 6.13 0.112289 6.28502L2.51229 8.68502C2.6685 8.84118 2.92169 8.84118 3.07788 8.68502L9.87787 1.88501C10.0368 1.73151 10.0412 1.4783 9.88771 1.31939Z"
                      fill="black"
                      fillOpacity="0.5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_37_681">
                      <rect width="10" height="10" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                {item.trim()}
              </p>
            ))}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">Бусад</h2>
            {apartment?.otherCategory?.split(",").map((item, index) => (
              <p
                key={index}
                className="text-muted-foreground flex items-center gap-1"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_37_681)">
                    <path
                      d="M9.88771 1.31939C9.73424 1.16048 9.48102 1.15608 9.32212 1.30955C9.31879 1.31276 9.31551 1.31604 9.31227 1.31939L2.79508 7.8366L0.677882 5.7194C0.518976 5.56593 0.265758 5.57034 0.112289 5.72924C-0.0374297 5.88426 -0.0374297 6.13 0.112289 6.28502L2.51229 8.68502C2.6685 8.84118 2.92169 8.84118 3.07788 8.68502L9.87787 1.88501C10.0368 1.73151 10.0412 1.4783 9.88771 1.31939Z"
                      fill="black"
                      fillOpacity="0.5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_37_681">
                      <rect width="10" height="10" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                {item.trim()}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center mb-20">
        <Button
          onClick={() => setStep(step + 1)}
          className="border text-white bg-[#7065F0] cursor-pointer"
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
};
