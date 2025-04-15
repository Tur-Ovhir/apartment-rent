"use client"

import { Button } from "../ui/button"
import { HiArrowsUpDown } from "react-icons/hi2";
export const FeatureCard = ()=> {
    return(
<div className="flex flex-col m-auto gap-5">
      <div className="flex flex-row gap-4">
        <h1 className="font-bold">Онцлох байр</h1>
       <Button className="bg-white border text-black -mt-1 hover:bg-gray-300">
        Ухаалаг эрэмбэ <HiArrowsUpDown className="text-red-500"/>
       </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full  justify-center mx-auto mt-2">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="w-[285px] h-[318px] border rounded-xl shadow-md flex items-center justify-center text-xl font-semibold"
          >
            Card {index + 1}
          </div>
        ))}
      </div>
    </div>
    )
}