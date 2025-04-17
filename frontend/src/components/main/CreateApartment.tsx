import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

type CreateApartmentProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const CreateApartment = ({}: CreateApartmentProps) => {
  return (
    <div>
      <div>CreateApartment</div>
      <Button className="fit m-auto bg-[#7065F0] px-16 cursor-pointer">
        Next
      </Button>
    </div>
  );
};
