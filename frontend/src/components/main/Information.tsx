import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export const Information = () => {
  return (
    <Card className="w-[900px] mx-auto p-6 shadow-xl rounded-2xl border border-gray-200">
      <CardContent className="space-y-6 ">
        <h2 className="text-2xl font-semibold text-gray-800">
          Ерөнхий мэдээлэл
        </h2>

        <div className=" flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Байр *</Label>
            <Input id="location" placeholder="Жишээ: 13-р хороолол, 4-р байр" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Үнэ *</Label>
            <Input id="price" placeholder="₮" type="number" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="totalRooms">Өрөөний тоо *</Label>
            <Input id="totalRooms" placeholder="Жишээ: 3" type="number" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bedrooms">Унтлагын өрөө *</Label>
            <Input id="bedrooms" placeholder="Жишээ: 2" type="number" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="area">Талбай (м²) *</Label>
            <Input id="area" placeholder="Жишээ: 65" type="number" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="year">Ашиглалтанд орсон он *</Label>
            <Input id="year" placeholder="Жишээ: 2019" type="number" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="floor">Давхар *</Label>
            <Input id="floor" placeholder="Жишээ: 5" type="number" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="furnished">Тавилгатай</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Тийм</SelectItem>
                <SelectItem value="no">Үгүй</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="facing">Хаашаа харсан цонхтой</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Урагшаа</SelectItem>
                <SelectItem value="no">Хойшоо</SelectItem>
                <SelectItem value="right">Баруун</SelectItem>
                <SelectItem value="left">зүүн</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1">
            <Label htmlFor="description">Тайлбар *</Label>
            <Textarea
              id="description"
              placeholder="Жишээ: Цэвэрхэн тохилог орон сууц, төв зам дагуу байрлалтай..."
              rows={4}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
