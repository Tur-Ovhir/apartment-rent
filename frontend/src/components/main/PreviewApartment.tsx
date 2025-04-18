import { Dispatch, SetStateAction } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { GeneralInfo } from "./GeneralInfo";
import { Feature } from "./Feature";
import { Button } from "../ui/button";

type PreviewApartmentProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const PreviewApartment = ({ step, setStep }: PreviewApartmentProps) => {
  return (
    <div>
      <div className="mt-5 ">
        <ImageCarousel />
      </div>
      <div className="mt-10">
        <GeneralInfo />
      </div>
      <div className="flex justify-center mt-10">
        <Feature />
      </div>
      <div className="flex justify-center mt-5 mb-20">
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
