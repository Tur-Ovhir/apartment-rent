"use client";

import { FaPen, FaEye, FaPhone, FaCheck } from "react-icons/fa";

export const RentLevel = () => {
  const steps = [
    { icon: <FaPen />, isActive: true },
    { icon: <FaEye />, isActive: false },
    { icon: <FaPhone />, isActive: false },
    { icon: <FaCheck />, isActive: false },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto p-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl ${
              step.isActive ? "bg-[#7065F0]" : "bg-gray-400"
            }`}
          >
            {step.icon}
          </div>
          {index !== steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-gray-400 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
};
