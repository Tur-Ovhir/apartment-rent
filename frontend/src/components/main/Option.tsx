"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export const Option = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  const [district, setDistrict] = useState("");
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filters: Record<string, string> = {};

    if (district) filters.location = district;
    if (rooms) filters.minRooms = rooms;
    if (price) filters.minPrice = price;
    if (area) filters.minArea = area;
    if (search) filters.search = search;

    onFilter(filters);
  }, [district, rooms, price, area, search]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-based тул 1 нэмнэ
    const day = date.getDate();
    return `${year} оны ${month} сарын ${day} өдөр`;
  };

  return (
    <Card className="w-full mx-auto p-6 shadow-lg rounded-2xl border border-gray-200">
      <CardContent className="flex gap-4 items-center">
        <Select onValueChange={(val) => setDistrict(val)}>
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

        <Select onValueChange={(val) => setPrice(val)}>
          <SelectTrigger className="w-[135px]">
            <SelectValue placeholder="Үнэ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1000000">1 сая+</SelectItem>
            <SelectItem value="2000000">2 сая+</SelectItem>
            <SelectItem value="3000000">3 сая+</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => setArea(val)}>
          <SelectTrigger className="w-[135px]">
            <SelectValue placeholder="Талбай" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="40">40м²+</SelectItem>
            <SelectItem value="60">60м²+</SelectItem>
            <SelectItem value="80">80м²+</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => setRooms(val)}>
          <SelectTrigger className="w-[145px]">
            <SelectValue placeholder="Өрөөний тоо" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 өрөө</SelectItem>
            <SelectItem value="2">2 өрөө</SelectItem>
            <SelectItem value="3">3 өрөө</SelectItem>
            <SelectItem value="4">4 өрөө</SelectItem>
            <SelectItem value="5">5+ өрөө</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-row items-center gap-1">
          <Input
            placeholder="Хайх..."
            className="w-[180px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline">
            <FaSearch className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
