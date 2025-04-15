"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiHome6Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
export default function LoginPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex flex-row gap-1 justify-center ">
          <RiHome6Fill className="w-7 h-7 text-[#7065F0]" />
          <h1 className="font-bold text-xl">HomeLink</h1>
        </div>
        <Input
          type="text"
          placeholder="Нэр"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3"
        />
        <Input
          type="text"
          placeholder="Утас"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex flex-row gap-1 ml-3">
          <Checkbox className="w-5 h-5 border border-black" />
          <h1 className="font-ligh text-sm font-light">Түрээслэгч</h1>
        </div>
        <div className="flex flex-row gap-1 mt-3 ml-3">
          <Checkbox className="w-5 h-5 border border-black" />
          <h1 className="font-light text-sm ">Түрээслүүлэгч</h1>
        </div>
        <Link href="/Home">
        <Button className="w-full bg-blue-400 text-white py-2 rounded-md mb-4 hover:bg-blue-500 transition mt-3">
          Нэвтрэх
        </Button>
        </Link>
        <div className="flex items-center justify-between mb-4">
          <hr className="w-1/3" />
          <span className="text-gray-500 text-sm">or</span>
          <hr className="w-1/3" />
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition">
          <FcGoogle size={20} />
          Connect with Google
        </button>
      </div>
    </div>
  );
}
