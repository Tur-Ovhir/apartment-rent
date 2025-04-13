"use client";

import Image from "next/image";
import React, { useState } from "react";
import { GrGallery } from "react-icons/gr";
export const ImageUpload = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, 30);
    setImages(newImages);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Зураг нийтлэх</h2>
      <div className="text-center mb-4">
        <div className="text-gray-600 mb-2 flex flex-col items-center justify-center gap-2">
          <GrGallery className="w-5 h-5" />
          Та зар сурталчилгаандаа 30 зураг нэмэх боломжтой
        </div>
        <label className="inline-block px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700">
          Компьютерээс татаж авах
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="border-2 border-purple-500 p-4 bg-gray-100 text-center">
        {images.length < 30 ? (
          <>
            <div className="text-red-600 text-3xl mb-2">+</div>
            <p className="text-gray-600">
              Та зар сурталчилгаандаа 30 зураг нэмэх боломжтой
            </p>
          </>
        ) : (
          <p className="text-gray-600">Хамгийн ихдээ 30 зураг байж болно</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Image
            key={index}
            src={URL.createObjectURL(image)}
            alt={`upload-${index}`}
            className="w-full h-32 object-cover rounded shadow"
          />
        ))}
      </div>
    </div>
  );
};
