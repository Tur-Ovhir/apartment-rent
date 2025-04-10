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
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
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
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
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
