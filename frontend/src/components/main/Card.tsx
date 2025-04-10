"use client";
import React from "react";
import { Button } from "../ui/button";

export const Card = () => {
  return (
    <div className="flex flex-col p-5 m-auto">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold">Онцлох байр</h1>
        <Button className="bg-white border text-black hover:bg-black hover:text-white">
          Бүгд
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full  justify-center mx-auto mt-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-[285px] h-[318px] border rounded-xl shadow-md flex items-center justify-center text-xl font-semibold"
          >
            Card {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
