import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { ApartmentCategory } from "./ApartmentCategoty";
import { Information } from "./Information";
import { MapNotit } from "./MapNotif";
import { ImageUpload } from "./ImageUpload";
import { Feature } from "./Feature";

type CreateApartmentProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const CreateApartment = ({}: CreateApartmentProps) => {
  return (
    <div className="flex flex-col gap-3">
      <ApartmentCategory />
      <Information />
      <div className="flex justify-center">
        <MapNotit />
      </div>
      <ImageUpload />
      <div className="flex justify-center">
        <Feature />
      </div>

      <div className="flex justify-center mt-5 mb-20">
        <Button className="border text-white bg-[#7065F0] cursor-pointer">
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
};
