"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export const MapNotit = () => {
  return (
    <div className="space-y-2 w-[900px] p-10 border rounded-xl">
      <h2 className="text-xl font-semibold mb-2">Байршлын мэдээлэл</h2>

      <div className="flex gap-4 mb-4">
        <div className="space-y-1.5 flex flex-col gap-1">
          <Select>
            <SelectTrigger className="w-[135px]">
              <SelectValue placeholder="Дүүрэг" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baganuur">Багануур</SelectItem>
              <SelectItem value="bagakhangai">Багахангай</SelectItem>
              <SelectItem value="bayangol">Баянгол</SelectItem>
              <SelectItem value="bayanzurkh">Баянзүрх</SelectItem>
              <SelectItem value="nalaikh">Налайх</SelectItem>
              <SelectItem value="songinohairkhan">Сонгинохайрхан</SelectItem>
              <SelectItem value="sukhbaatar">Сүхбаатар</SelectItem>
              <SelectItem value="khan-uul">Хан-Уул</SelectItem>
              <SelectItem value="chingeltei">Чингэлтэй</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 flex flex-col gap-1">
          <Select>
            <SelectTrigger className="w-[135px]">
              <SelectValue placeholder="Хороо" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baganuur">1</SelectItem>
              <SelectItem value="bagakhangai">2</SelectItem>
              <SelectItem value="bayangol">3</SelectItem>
              <SelectItem value="bayanzurkh">5</SelectItem>
              <SelectItem value="nalaikh">8</SelectItem>
              <SelectItem value="songinohairkhan">10</SelectItem>
              <SelectItem value="sukhbaatar">15</SelectItem>
              <SelectItem value="khan-uul">18</SelectItem>
              <SelectItem value="chingeltei">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Image
        src="https://res.cloudinary.com/dykm0aphm/image/upload/v1744442469/Screenshot_2025-04-12_at_13.56.12_vupomr.png"
        alt="Map preview"
        width={900}
        height={624}
        className="rounded-md border"
      />
    </div>
  );
};
