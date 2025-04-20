"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";

export const EmailOption = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  return (
    <Card className="w-[900px] mx-auto p-6 shadow-xl rounded-2xl border border-gray-200">
      <CardContent className="space-y-6">
        <p className="text-gray-500 text-sm">
          Хамгийн шинэлэг, онцгой мэдээллийг хамгийн түрүүнд авахыг хүсвэл имэйл
          хаягаа бүртгүүлээрэй!
        </p>
        <div className="flex items-center gap-4">
          <Label>E-mail</Label>
          <ToggleSwitch
            checked={toggle1}
            onChange={() => setToggle1(!toggle1)}
          />
          <Label>SMS</Label>
          <ToggleSwitch
            checked={toggle2}
            onChange={() => setToggle2(!toggle2)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
};

function ToggleSwitch({ checked, onChange }: ToggleProps) {
  return (
    <Label className="flex items-center gap-2 cursor-pointer">
      <Input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
          checked ? "bg-[#7065F0]" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </div>
      <span className="text-gray-500 text-sm w-6">
        {checked ? "Yes" : "No"}
      </span>
    </Label>
  );
}
