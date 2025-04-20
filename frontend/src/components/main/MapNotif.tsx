"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { FormikProps } from "formik";
import { ApartmentFormValues } from "./CreateApartment";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React, { useState } from "react";

interface MapNotitProps {
  apartmentForm: FormikProps<ApartmentFormValues>;
}

const districts = [
  { value: "baganuur", label: "Багануур" },
  { value: "bagakhangai", label: "Багахангай" },
  { value: "bayangol", label: "Баянгол" },
  { value: "bayanzurkh", label: "Баянзүрх" },
  { value: "nalaikh", label: "Налайх" },
  { value: "songinohairkhan", label: "Сонгинохайрхан" },
  { value: "sukhbaatar", label: "Сүхбаатар" },
  { value: "khan-uul", label: "Хан-Уул" },
  { value: "chingeltei", label: "Чингэлтэй" },
];

const khoroos = ["1", "2", "3", "5", "8", "10", "15", "18", "20"];

export const MapNotit = ({ apartmentForm }: MapNotitProps) => {
  const [districtLabel, setDistrictLabel] = useState<string>("");
  const [khoroo, setKhoroo] = useState<string>("");

  const updateLocation = (district?: string, khoroo?: string) => {
    if (district && khoroo) {
      const newLocation = `${district}, ${khoroo}-р хороо`;
      apartmentForm.setFieldValue("location", newLocation);
    }
  };

  const handleDistrictChange = (value: string) => {
    const label = districts.find((d) => d.value === value)?.label || "";
    setDistrictLabel(label);
    updateLocation(label, khoroo);
  };

  const handleKhorooChange = (value: string) => {
    setKhoroo(value);
    updateLocation(districtLabel, value);
  };

  return (
    <Card className="w-[900px] mx-auto p-6 shadow-xl rounded-2xl border border-gray-200">
      <CardContent className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Байршлын мэдээлэл
        </h2>

        <div className="flex gap-4 mb-4">
          <div className="space-y-1.5 flex flex-col gap-1">
            <Label>Дүүрэг</Label>
            <Select onValueChange={handleDistrictChange}>
              <SelectTrigger className="w-[135px]">
                <SelectValue placeholder="Сонгох" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.value} value={district.value}>
                    {district.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 flex flex-col gap-1">
            <Label>Хороо</Label>
            <Select onValueChange={handleKhorooChange}>
              <SelectTrigger className="w-[135px]">
                <SelectValue placeholder="Сонгох" />
              </SelectTrigger>
              <SelectContent>
                {khoroos.map((khorooNum) => (
                  <SelectItem key={khorooNum} value={khorooNum}>
                    {khorooNum}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="latitude">Өргөрөг *</Label>
            <Input
              id="latitude"
              name="latitude"
              value={apartmentForm.values.latitude}
              onChange={apartmentForm.handleChange}
              onBlur={apartmentForm.handleBlur}
              placeholder="Жишээ: 47.9184"
              type="text"
            />
            {apartmentForm.errors.latitude &&
              apartmentForm.touched.latitude && (
                <span className="text-red-500 text-sm">
                  {apartmentForm.errors.latitude}
                </span>
              )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="longitude">Уртраг *</Label>
            <Input
              id="longitude"
              name="longitude"
              value={apartmentForm.values.longitude}
              onChange={apartmentForm.handleChange}
              placeholder="Жишээ: 106.9172"
              type="text"
            />
            {apartmentForm.errors.longitude &&
              apartmentForm.touched.longitude && (
                <span className="text-red-500 text-sm">
                  {apartmentForm.errors.longitude}
                </span>
              )}
          </div>
        </div>

        <Image
          src="https://res.cloudinary.com/dykm0aphm/image/upload/v1744442469/Screenshot_2025-04-12_at_13.56.12_vupomr.png"
          alt="Map preview"
          width={900}
          height={624}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};
