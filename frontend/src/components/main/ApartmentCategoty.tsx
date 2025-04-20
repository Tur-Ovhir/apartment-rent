import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface ApartmentCategoryProps {
  highlight: boolean;
  setHighlight: (highlight: boolean) => void;
}
export const ApartmentCategory = ({
  highlight,
  setHighlight,
}: ApartmentCategoryProps) => {
  return (
    <Card className="w-[900px] mx-auto p-6 shadow-md rounded-2xl border border-gray-200 mt-8">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Байрны ангилал</h2>

        <div className="space-y-2">
          <Label htmlFor="type">Төрөл *</Label>
          <Select
            value={highlight ? "highlight" : "normal"}
            onValueChange={(value) => setHighlight(value === "highlight")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highlight">Онцлох</SelectItem>
              <SelectItem value="normal">Энгийн</SelectItem>
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
