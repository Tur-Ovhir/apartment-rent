"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const RentContract = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-md border ">
      <h2 className="text-2xl font-bold mb-6 ">Гэрээнд тусгах мэдээлэл</h2>

      <div className="grid gap-4 p-6">
        <div className="grid gap-1">
          <Label className="text-sm text-gray-600">Түрээслэх хугацаа</Label>
          <Input  />
        </div>

        <div className="grid gap-1">
          <Label className="text-sm text-gray-600">Түрээсийн төлбөрийн хэлбэр</Label>
          <Input  />
        </div>

        <div className="grid gap-1">
          <Label className="text-sm text-gray-600">Төлбөрийн хэмжээ</Label>
          <Input  />
        </div>

        <div className="grid gap-1">
          <Label className="text-sm text-gray-600">Барьцаа мөнгөний хэмжээ</Label>
          <Input  />
        </div>

        <div className="grid gap-1">
          <Label className="text-sm text-gray-600">Ашиглалтын зардал байгаа эсэх (байрны төлбөр)</Label>
          <Input  />
        </div>

        <div className="grid gap-1">
          <Label className="text-sm text-gray-600">Нэмэлт</Label>
          <Textarea placeholder="Нэмэлт мэдээлэл бичнэ үү" className="h-30" rows={4} />
        </div>

        <div className="pt-4 flex justify-center">
          <Button className="bg-white text-black hover:bg-violet-600 border px-8">
            Гэрээнд оруулах
          </Button>
        </div>
      </div>
    </div>
  );
};