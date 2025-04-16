"use client"
import { Check } from "lucide-react";

export const Done =() => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-center space-y-3 font-light">
      <Check className="w-20 h-20 text-green-500" />
      <p className="text-gray-700 text-xl ">
        Таны зар амжилттай нийтлэгдсэн байна.
      </p>
      <p className="text-gray-500 text-xl">Баярлалаа</p>
    </div>
  );
}
