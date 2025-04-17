import { Dispatch, SetStateAction } from "react";

type PreviewApartmentProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const PreviewApartment = ({}: PreviewApartmentProps) => {
  return <div>PreviewApartment</div>;
};
