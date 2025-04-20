"use client";

import Image from "next/image";
import React, { useState } from "react";
import { GrGallery } from "react-icons/gr";
import { Input } from "../ui/input";

interface ImageUploadProps {
  images: string[];
  setImages: (images: string[]) => void;
}

export const ImageUpload = ({}: ImageUploadProps) => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, 30);
    setImages(newImages);
  };

  return (
    <div className="w-[900px] min-h-[377px] mx-auto p-6 rounded-2xl border border-gray-200 shadow-md bg-white space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Зураг нийтлэх</h2>

      <div className="text-center space-y-3">
        <div className="flex flex-col items-center justify-center text-gray-600 gap-1">
          <GrGallery className="w-6 h-6" />
          <p>
            Та зар сурталчилгаандаа <strong>30 зураг</strong> нэмэх боломжтой
          </p>
        </div>

        <label className="inline-block px-5 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition">
          Компьютерээс зураг сонгох
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="border-2 border-dashed border-purple-400 bg-gray-50 p-6 rounded-md text-center">
        {images.length < 30 ? (
          <>
            <div className="text-red-600 text-4xl font-bold mb-2">+</div>
            <p className="text-gray-600">
              Та зар сурталчилгаандаа <strong>30 зураг</strong> нэмэх боломжтой
            </p>
          </>
        ) : (
          <p className="text-gray-600">
            Хамгийн ихдээ <strong>30 зураг</strong> байж болно
          </p>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-32 overflow-hidden rounded shadow"
            >
              <Image
                src={URL.createObjectURL(image)}
                alt={`upload-${index}`}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
