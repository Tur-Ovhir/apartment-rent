"use client";
import { Button } from "../ui/button";
import { BiWorld } from "react-icons/bi";

import { RiHome6Fill } from "react-icons/ri";
export const Navbar = () => {
  return (
    <div>
      <div className="w-full border h-[70px] flex flex-row items-center p-3 justify-between">
        <div className="flex flex-row gap-1">
          <BiWorld className="w-7 h-7" />
          <h1 className="font-bold text-xl text-[#1D175D]">Монгол</h1>
        </div>
        <div className="flex flex-row gap-1">
          <RiHome6Fill className="w-7 h-7 text-[#7065F0]" />
          <h1 className="font-bold text-xl">HomeLink</h1>
        </div>
        <div className="flex flex-row gap-1">
          <Button className="w-[94px] h-[50px] bg-white border border-[#E0DEF7] text-black hover:bg-[#7065F0] hover:text-white">
            Login
          </Button>
          <Button className="w-[94px] h-[50px] bg-white text-black border hover:bg-[#7065F0] hover:text-white">
            Sign up
          </Button>
          <Button className="w-[166px] h-[50px] bg-white text-black border hover:bg-[#7065F0] hover:text-white">
            Орон сууц нэмэх
          </Button>
        </div>
      </div>
    </div>
  );
};
