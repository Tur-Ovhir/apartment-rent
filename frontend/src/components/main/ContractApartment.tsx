import { Dispatch, SetStateAction } from "react";

type ContractApartmentProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const ContractApartment = ({}: ContractApartmentProps) => {
  return <div>contractApartment</div>;
};
