"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ApartmentCategory } from "./ApartmentCategoty";
import { Information } from "./Information";
import { MapNotit } from "./MapNotif";
import { ImageUpload } from "./ImageUpload";
import { Feature } from "./Feature";
import { useFormik } from "formik";
import * as yup from "yup";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export interface ApartmentFormValues {
  title: string;
  price: number;
  rooms: number;
  bathrooms: number;
  area: number;
  builtYear: number;
  floor: number;
  isFurnished: boolean;
  isHighlight: boolean;
  facing?: string;
  description?: string;
  location: string;
  latitude: string;
  longitude: string;
  interiorCategory?: string;
  otherCategory?: string;
  ownerId: number;
  images: string[];
}
type CreateApartmentProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setApartmentId: Dispatch<SetStateAction<number | undefined>>;
};

export const CreateApartment = ({
  step,
  setStep,
  setApartmentId,
}: CreateApartmentProps) => {
  const [selectedInterior, setSelectedInterior] = useState<string[]>([]);
  const [selectedOther, setSelectedOther] = useState<string[]>([]);

  useEffect(() => {
    apartmentForm.setFieldValue(
      "interiorCategory",
      selectedInterior.join(", ")
    );
  }, [selectedInterior]);

  useEffect(() => {
    apartmentForm.setFieldValue("otherCategory", selectedOther.join(", "));
  }, [selectedOther]);

  const apartmentForm = useFormik<ApartmentFormValues>({
    initialValues: {
      title: "",
      price: 0,
      rooms: 1,
      bathrooms: 1,
      area: 0,
      builtYear: new Date().getFullYear(),
      floor: 1,
      isFurnished: false,
      isHighlight: false,
      facing: "",
      description: "",
      location: "",
      latitude: "",
      longitude: "",
      interiorCategory: "",
      otherCategory: selectedOther.join(", "),
      ownerId: 0,
      images: [],
    },
    validationSchema: yup.object({
      title: yup.string().required("Гарчиг заавал шаардлагатай"),
      price: yup.number().min(0).required("Үнэ заавал шаардлагатай"),
      rooms: yup.number().min(1).required("Өрөөний тоо заавал"),
      bathrooms: yup.number().min(1).required("Угаалгын өрөөний тоо заавал"),
      area: yup.number().min(1).required("Талбайн хэмжээ заавал"),
      builtYear: yup
        .number()
        .min(1900)
        .max(new Date().getFullYear())
        .required(),
      floor: yup.number().min(1).required(),
      isFurnished: yup.boolean().required(),
      facing: yup.string().optional(),
      description: yup.string().optional(),
      location: yup.string().required("Хаяг заавал"),
      latitude: yup.string().required("Өргөрөг заавал"),
      longitude: yup.string().required("Уртраг заавал"),
      interiorCategory: yup.string().optional(),
      otherCategory: yup.string().optional(),
      ownerId: yup.number().required("Owner ID заавал"),
      images: yup.array().required("Зураг оруулна уу!"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.post(
          "/apartment",
          {
            ...values,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApartmentId(res.data.apartment.id);
        setStep(step + 1);
      } catch (error) {
        console.log(error);
        toast.error("Мэдээлэл буруу!!!");
      }
    },
  });

  return (
    <form onSubmit={apartmentForm.handleSubmit} className="flex flex-col gap-3">
      <ApartmentCategory
        highlight={apartmentForm.values.isHighlight}
        setHighlight={(highlight: boolean) =>
          apartmentForm.setFieldValue("isHighlight", highlight)
        }
      />
      <Information apartmentForm={apartmentForm} />
      <MapNotit apartmentForm={apartmentForm} />
      <ImageUpload
        images={apartmentForm.values.images}
        setImages={(images: string[]) =>
          apartmentForm.setFieldValue("images", images)
        }
      />
      <Feature
        selectedInterior={selectedInterior}
        selectedOther={selectedOther}
        setSelectedInterior={setSelectedInterior}
        setSelectedOther={setSelectedOther}
      />

      <div className="flex justify-center mt-5 mb-20">
        <Button
          type="submit"
          className="border text-white bg-[#7065F0] cursor-pointer"
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </form>
  );
};
