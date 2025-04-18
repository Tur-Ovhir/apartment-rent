import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { EmailOption } from "./EmailOption";
import { Contact } from "./Contact";

type ContractApartmentProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const ContractApartment = ({
  step,
  setStep,
}: ContractApartmentProps) => {
  return (
    <div>
      <Contact />
      <EmailOption />
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
