"use client"
import React from "react";

export const LivingRoom = () => {
  return (
    <div className="flex flex-col md:flex-row p-6 gap-6 bg-white rounded-2xl shadow-lg max-w-7xl mx-auto border w-[900px] h-[474px]">
      <div className="flex-1">
        <div  className="flex flex-col gap-4">         
          <div className="bg-gray-200 h-64 rounded-lg flex items-end p-4 relative">
            <div className="absolute top-2 left-2 text-xs text-gray-400"></div>          
          </div>
          <div className="flex justify-between gap-2">
            <div className="w-1/3 h-40 bg-gray-200 rounded" />
            <div className="w-1/3 h-40 bg-gray-200 rounded" />
            <div className="w-1/3 h-40 bg-gray-200 rounded" />
          </div>
        </div>
      </div>     
    </div>
  );
};

