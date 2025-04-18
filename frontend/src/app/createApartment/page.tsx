"use client";
import {
  CreateApartment,
  ContractApartment,
  Navbar,
  PreviewApartment,
  RentLevel,
  Done,
} from "@/components/main";
import { useState } from "react";

export default function Apartment() {
  const [step, setStep] = useState(2);

  return (
    <div className="flex flex-col">
      <Navbar />
      <RentLevel step={step} />
      {step === 1 && <CreateApartment step={step} setStep={setStep} />}
      {step === 2 && <PreviewApartment step={step} setStep={setStep} />}
      {step === 3 && <ContractApartment step={step} setStep={setStep} />}
      {step > 3 && <Done />}
    </div>
  );
}
