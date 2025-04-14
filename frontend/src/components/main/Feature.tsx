"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

const interiorFeatures = [
  "WiFi суурилуулсан",
  "Дохиолол",
  "Тагт",
  "Бүтэн гал тогооны тавилга",
  "Тавилгатай",
  "Агааржуулагч",
  "Хувцасны өрөө",
  "Шүршүүр",
  "Хөшиг",
  "Шалны халаалт",
  "Давхар шилтэй цонх",
  "Байгалийн гэрэлтүүлэг сайтай",
  "Хүүхдэд ээлтэй дотоод зохион байгуулалт",
  "Сайн дулаалгатай",
  "Дуу тусгаарлагчтай хана",
  "Хяналтын камер",
  "Кабелийн телевиз",
  "Түрээслэгчийн засварын хариуцлага тодорхой заасан",
  "Түрээсийн үнэнд дунд засвар, үйлчилгээ багтсан",
];

const otherFeatures = [
  "Цахилгаан шат",
  "Цэцэрлэгжүүлэлт",
  "Тайван, дуу чимээ багатай байршил",
  "Харуул хамгаалалт",
  "Машины зогсоол",
  "Хүүхдийн тоглоомын талбай",
  "Онцгой байдлын шат",
  "Хөл бөмбөгийн талбай",
  "Сагсан бөмбөгийн талбай",
  "Сургууль, цэцэрлэгтэй ойр",
  "Зах, худалдааны төв",
  "Нийтийн тээврийн буудалтай ойр",
  "Фитнесс танхим",
  "Тэргэнцрийн замтай",
  "Усанд сэлэх бассейн",
];

export const Feature = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setSelected((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const renderCheckboxGrid = (items: string[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-[900px] justify-center">
      {items.map((feature) => (
        <Label key={feature} className="flex items-center space-x-2">
          <Checkbox
            checked={selected.includes(feature)}
            onCheckedChange={() => toggleFeature(feature)}
          />
          <span className="text-sm">{feature}</span>
        </Label>
      ))}
    </div>
  );
  return (
    <div className="p-4 space-y-6 flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Онцлог</h2>
        <h3 className="text-lg font-semibold mb-2">Интерьерийн онцлог</h3>
        {renderCheckboxGrid(interiorFeatures)}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Бусад</h3>
        {renderCheckboxGrid(otherFeatures)}
      </div>
    </div>
  );
};
