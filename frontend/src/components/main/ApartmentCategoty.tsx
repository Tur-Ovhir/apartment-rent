import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export const ApartmentCategory = () => {
  return (
    <Card className="w-[900px] mx-auto p-6 shadow-md rounded-2xl border border-gray-200 mt-8">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Байрны ангилал</h2>

        <div className="space-y-2">
          <Label htmlFor="type">Төрөл *</Label>
          <Select>
            <SelectTrigger defaultValue="premium">
              <SelectValue placeholder="Сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="common">Онцлох</SelectItem>
              <SelectItem value="premium">Энгийн</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground">
          Хэрвээ онцлох бол та нэмэлт төлбөр төлөх болохыг анхаарна уу!!
        </p>
      </CardContent>
    </Card>
  );
};
