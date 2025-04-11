"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RentContract = () => {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold">Түрээсийн гэрээ байгуулах</h2>

      <div className="space-y-2">
        <Label>Төлбөрийн нөхцөл</Label>
        <Input placeholder="Төлбөрийн нөхцөл" />
      </div>

      <div className="space-y-2">
        <Label>Төлбөрийн хэмжээ</Label>
        <Input placeholder="Төлбөрийн хэмжээ" />
      </div>

      <div className="space-y-2">
        <Label>Ашиглалтын зардал байгаа эсэх</Label>
        <Input placeholder="Ашиглалтын зардал байгаа эсэх" />
      </div>

      <div className="space-y-2">
        <Label>Барьцаа мөнгөний хэмжээ</Label>
        <Input placeholder="Барьцаа мөнгөний хэмжээ" />
      </div>

      <div className="space-y-2">
        <Label>Барьцаа мөнгөний хэмжээ</Label>
        <Input placeholder="Барьцаа мөнгөний хэмжээ" />
      </div>

      <div className="space-y-2">
        <Label>Барьцаа мөнгөний хэмжээ</Label>
        <Input placeholder="Барьцаа мөнгөний хэмжээ" />
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="agree-terms" />
          <Label htmlFor="agree-terms">Энэ нөхцөлийг зөвшөөрч байна уу</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="dan-verify" />
          <Label htmlFor="dan-verify" className="text-red-600">
            ДАН баталгаажуулалт
          </Label>
        </div>

        <div className="space-y-2">
          <Label>Гэрээнд гарын үсэг зурах</Label>
          <Input placeholder="Гэрээнд гарын үсэг зурах" />
        </div>

        <Button className="bg-red-600 hover:bg-red-700">Гэрээг цуцлах</Button>
      </div>
    </div>
  );
};
