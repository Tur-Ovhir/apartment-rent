import { ApartmentType } from "@/types";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface GeneralInfoProps {
  apartment: ApartmentType | undefined;
}
export const GeneralInfo = ({ apartment }: GeneralInfoProps) => {
  return (
    <Card className="w-[900px] mx-auto p-6 shadow-lg rounded-2xl border border-gray-200">
      <CardContent className="">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{apartment?.title}</h1>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="w-4 h-4 text-yellow-400 mr-1" />
              {apartment?.location}
            </div>
          </div>
          <div className="text-2xl font-bold text-black">
            {apartment?.price.toLocaleString()}₮
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-4">Ерөнхий мэдээлэл</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 text-sm">
            <div className="text-muted-foreground">
              Зар сурталчилгааны дугаар
            </div>
            <div className="text-red-500">{apartment?.id}</div>

            <div className="text-muted-foreground">Давхар</div>
            <div>{apartment?.floor}</div>

            <div className="text-muted-foreground">Нийтэлсэн огноо</div>
            <div>02 march 2025</div>

            <div className="text-muted-foreground">Хаашаа харсан</div>
            <div>{apartment?.facing}</div>

            <div className="text-muted-foreground">Орон сууцны төрөл</div>
            <div>Apartment</div>

            <div className="text-muted-foreground">Тавилгатай</div>
            <div>{apartment?.isFurnished ? "Тийм" : "Үгүй"}</div>

            <div className="text-muted-foreground">Өрөөний тоо</div>
            <div>{apartment?.rooms}</div>

            <div className="text-muted-foreground">Төлбөр(сар)</div>
            <div>{apartment?.price.toLocaleString()}₮</div>

            <div className="text-muted-foreground">Талбайн хэмжээ</div>
            <div>{apartment?.area} M²</div>

            <div className="text-muted-foreground">Барилгын нас Age</div>
            <div>{2025 - (apartment?.builtYear || 2025)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
