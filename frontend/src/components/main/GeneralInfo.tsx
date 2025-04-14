import { MapPin } from "lucide-react";

export const GeneralInfo = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 border rounded-xl bg-white shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Сөүлийн 14-р байр</h1>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <MapPin className="w-4 h-4 text-yellow-400 mr-1" />
            БГД 1-р хороо
          </div>
        </div>
        <div className="text-2xl font-bold text-black">1.290.000₮</div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Ерөнхий мэдээлэл</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 text-sm">
          <div className="text-muted-foreground">Зар сурталчилгааны дугаар</div>
          <div className="text-red-500">0-1234</div>

          <div className="text-muted-foreground">Давхар</div>
          <div>3</div>

          <div className="text-muted-foreground">Нийтэлсэн огноо</div>
          <div>02 march 2025</div>

          <div className="text-muted-foreground">Хаашаа харсан</div>
          <div>Хойшоо</div>

          <div className="text-muted-foreground">Орон сууцны төрөл</div>
          <div>Apartment</div>

          <div className="text-muted-foreground">Тавилгатай</div>
          <div>Тийм</div>

          <div className="text-muted-foreground">Өрөөний тоо</div>
          <div>4</div>

          <div className="text-muted-foreground">Төлбөр(сар)</div>
          <div>1.290.000₮</div>

          <div className="text-muted-foreground">Талбайн хэмжээ</div>
          <div>150 M²</div>

          <div className="text-muted-foreground">Барилгын нас Age</div>
          <div>5</div>
        </div>
      </div>
    </div>
  );
};
