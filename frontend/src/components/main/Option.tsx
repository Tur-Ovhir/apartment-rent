"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
export const Option = () => {
  return (
    <div className="flex flex-row justify-between p-5 border  border-black">
      <div>
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

      <div>
        <Select>
          <SelectTrigger className="w-[135px]">
            <SelectValue placeholder="Төрөл" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[135px]">
            <SelectValue placeholder="Үнэ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[135px]">
            <SelectValue placeholder="Талбай" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[135px]">
            <SelectValue placeholder="Өрөөний тоо" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 өрөө</SelectItem>
            <SelectItem value="1">2 өрөө</SelectItem>
            <SelectItem value="3">3 өрөө</SelectItem>
            <SelectItem value="4">4 өрөө</SelectItem>
            <SelectItem value="5">5 өрөө</SelectItem>
            <SelectItem value="6">6 өрөө</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row  items-center gap-1">
        <Input placeholder="" className="w-[180px]" />
        <FaSearch className="w-5 h-5" />
      </div>
    </div>
  );
};
