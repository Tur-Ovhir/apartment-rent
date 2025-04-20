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
import { ApartmentFormValues } from "./CreateApartment";
import { FormikErrors, FormikProps, FormikTouched } from "formik";

interface InformationProps {
  apartmentForm: FormikProps<ApartmentFormValues>;
}
export const Information = ({ apartmentForm }: InformationProps) => {
  const showError = (
    field: keyof ApartmentFormValues,
    errors: FormikErrors<ApartmentFormValues>,
    touched: FormikTouched<ApartmentFormValues>
  ) => apartmentForm.submitCount > 0 && errors[field] && touched[field];

  return (
    <Card className="w-[900px] mx-auto p-6 shadow-xl rounded-2xl border border-gray-200">
      <CardContent className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Ерөнхий мэдээлэл
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Байр *</Label>
            <Input
              id="title"
              name="title"
              value={apartmentForm.values.title}
              onChange={apartmentForm.handleChange}
              onBlur={apartmentForm.handleBlur}
              placeholder="Жишээ: 13-р хороолол, 4-р байр"
            />
            {showError(
              "title",
              apartmentForm.errors,
              apartmentForm.touched
            ) && (
              <p className="text-red-500 text-sm">
                {apartmentForm.errors.location}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Үнэ *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={apartmentForm.values.price}
              onChange={apartmentForm.handleChange}
              onBlur={apartmentForm.handleBlur}
              placeholder="₮"
            />
            {showError(
              "price",
              apartmentForm.errors,
              apartmentForm.touched
            ) && (
              <p className="text-red-500 text-sm">
                {apartmentForm.errors.price}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="rooms">Өрөөний тоо *</Label>
            <Input
              id="rooms"
              name="rooms"
              type="number"
              value={apartmentForm.values.rooms}
              onChange={apartmentForm.handleChange}
              onBlur={apartmentForm.handleBlur}
              placeholder="Жишээ: 3"
            />
            {showError(
              "rooms",
              apartmentForm.errors,
              apartmentForm.touched
            ) && (
              <p className="text-red-500 text-sm">
                {apartmentForm.errors.rooms}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bathrooms">Угаалгын өрөө *</Label>
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={apartmentForm.values.bathrooms}
              onChange={apartmentForm.handleChange}
              onBlur={apartmentForm.handleBlur}
              placeholder="Жишээ: 2"
            />
            {showError(
              "bathrooms",
              apartmentForm.errors,
              apartmentForm.touched
            ) && (
              <p className="text-red-500 text-sm">
                {apartmentForm.errors.bathrooms}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="area">Талбай (м²) *</Label>
            <Input
              id="area"
              name="area"
              type="number"
              value={apartmentForm.values.area}
              onChange={apartmentForm.handleChange}
              onBlur={apartmentForm.handleBlur}
              placeholder="Жишээ: 65"
            />
            {showError("area", apartmentForm.errors, apartmentForm.touched) && (
              <p className="text-red-500 text-sm">
                {apartmentForm.errors.area}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="builtYear">Ашиглалтанд орсон он *</Label>
            <Input
              id="builtYear"
              name="builtYear"
              type="number"
              value={apartmentForm.values.builtYear}
              onChange={apartmentForm.handleChange}
              onBlur={apartmentForm.handleBlur}
              placeholder="Жишээ: 2019"
            />
            {showError(
              "builtYear",
              apartmentForm.errors,
              apartmentForm.touched
            ) && (
              <p className="text-red-500 text-sm">
                {apartmentForm.errors.builtYear}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="floor">Давхар *</Label>
            <Input
              id="floor"
              name="floor"
              type="number"
              value={apartmentForm.values.floor}
              onChange={apartmentForm.handleChange}
              onBlur={apartmentForm.handleBlur}
              placeholder="Жишээ: 5"
            />
            {showError(
              "floor",
              apartmentForm.errors,
              apartmentForm.touched
            ) && (
              <p className="text-red-500 text-sm">
                {apartmentForm.errors.floor}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="isFurnished">Тавилгатай *</Label>
            <Select
              value={apartmentForm.values.isFurnished ? "yes" : "no"}
              onValueChange={(value) =>
                apartmentForm.setFieldValue("isFurnished", value === "yes")
              }
            >
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
            <Select
              value={apartmentForm.values.facing || ""}
              onValueChange={(value) =>
                apartmentForm.setFieldValue("facing", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="south">Урагшаа</SelectItem>
                <SelectItem value="north">Хойшоо</SelectItem>
                <SelectItem value="east">Зүүн</SelectItem>
                <SelectItem value="west">Баруун</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Тайлбар</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Жишээ: Цэвэрхэн тохилог орон сууц, төв зам дагуу байрлалтай..."
              value={apartmentForm.values.description}
              onChange={apartmentForm.handleChange}
              onBlur={apartmentForm.handleBlur}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
