"use client";

import { FaPen, FaEye, FaPhone, FaCheck } from "react-icons/fa";

export const RentLevel = ({ step }: { step: number }) => {
  const steps = [
    { icon: <FaPen /> },
    { icon: <FaEye /> },
    { icon: <FaPhone /> },
    { icon: <FaCheck /> },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center w-full max-w-3xl p-4">
        {steps.map((s, index) => {
          const currentStep = index + 1;
          const isActive = currentStep <= step;
          const isLastStep = index === steps.length - 1;

          return (
            <div
              key={index}
              className={`flex items-center ${isLastStep ? "w-fit" : "flex-1"}`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl ${
                    isActive ? "bg-[#7065F0]" : "bg-gray-400"
                  }`}
                >
                  {s.icon}
                </div>
                <span className="text-sm mt-1"></span>
              </div>

              {!isLastStep && (
                <div className="flex-1 mx-2">
                  <div
                    className={`h-0.5 w-full ${
                      currentStep < step ? "bg-[#7065F0]" : "bg-gray-400"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
