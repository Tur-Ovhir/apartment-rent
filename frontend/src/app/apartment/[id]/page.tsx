"use client";
import { GeneralInfo } from "@/components/main";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { ApartmentType } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApartmentIdPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState<ApartmentType>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/apartment/${id}`);
        setApartment(response.data.apartment);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);
  return (
    <div className="space-y-5">
      {/* <ImageCarousel images={apartment?.images} /> */}
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
      <Card className="w-[900px] mx-auto p-6 shadow-lg rounded-2xl border border-gray-200">
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Байршлын мэдээлэл
          </h2>
          {apartment?.latitude && apartment?.longitude && (
            <iframe
              src={`https://maps.google.com/maps?q=${apartment.latitude},${apartment.longitude}&z=15&output=embed`}
              width="800"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
