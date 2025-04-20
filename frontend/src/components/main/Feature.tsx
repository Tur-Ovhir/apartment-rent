"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent } from "../ui/card";

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

interface FeatureProps {
  selectedInterior: string[];
  selectedOther: string[];
  setSelectedInterior: Dispatch<SetStateAction<string[]>>;
  setSelectedOther: Dispatch<SetStateAction<string[]>>;
}

export const Feature = ({
  selectedOther,
  selectedInterior,
  setSelectedOther,
  setSelectedInterior,
}: FeatureProps) => {
  const toggleFeature = (
    feature: string,
    _selected: string[],
    setSelected: Dispatch<SetStateAction<string[]>>
  ) => {
    setSelected((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const renderCheckboxGrid = (
    items: string[],
    selected: string[],
    setSelected: Dispatch<SetStateAction<string[]>>
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full justify-center">
      {items.map((feature) => (
        <Label key={feature} className="flex items-center space-x-2">
          <Checkbox
            className="cursor-pointer"
            checked={Array.isArray(selected) && selected.includes(feature)}
            onCheckedChange={() =>
              toggleFeature(feature, selected, setSelected)
            }
          />
          <span className="text-sm">{feature}</span>
        </Label>
      ))}
    </div>
  );

  return (
    <Card className="w-[900px] mx-auto p-6 shadow-xl rounded-2xl border border-gray-200">
      <CardContent className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Онцлог</h2>
          <h3 className="text-lg font-semibold mb-2">Интерьерийн онцлог</h3>
          {renderCheckboxGrid(
            interiorFeatures,
            selectedInterior,
            setSelectedInterior
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Бусад</h3>
          {renderCheckboxGrid(otherFeatures, selectedOther, setSelectedOther)}
        </div>
      </CardContent>
    </Card>
  );
};
