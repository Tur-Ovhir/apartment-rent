"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";

interface ContractFormValues {
  rentalPeriod: number;
  paymentType: string;
  paymentAmount: number;
  deposit: number;
  utilityIncluded: string;
  additional: string;
}

export default function ContractIncludes() {
  const router = useRouter();

  const contractForm = useFormik<ContractFormValues>({
    initialValues: {
      rentalPeriod: 0,
      paymentType: "",
      paymentAmount: 0,
      deposit: 0,
      utilityIncluded: "",
      additional: "",
    },
    validationSchema: yup.object({}), // Add rules here if needed
    onSubmit: async (values) => {
      localStorage.setItem("contract", JSON.stringify(values));
      localStorage.removeItem("contractRequest");
      router.push("/");
    },
  });

  return (
    <form
      onSubmit={contractForm.handleSubmit}
      className="h-screen flex items-center"
    >
      <Card className="w-[900px] mx-auto p-6 shadow-lg rounded-2xl border border-gray-200">
        <CardContent>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Гэрээнд тусгах мэдээлэл
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-full space-y-1">
                <Label>Түрээслэх хугацаа</Label>
                <Input
                  name="rentalPeriod"
                  value={contractForm.values.rentalPeriod}
                  onChange={contractForm.handleChange}
                />
              </div>
              <div className="w-full space-y-1">
                <Label>Түрээсийн төлбөрийн хэлбэр</Label>
                <Input
                  name="paymentType"
                  value={contractForm.values.paymentType}
                  onChange={contractForm.handleChange}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-full space-y-1">
                <Label>Төлбөрийн хэмжээ</Label>
                <Input
                  type="number"
                  name="paymentAmount"
                  value={contractForm.values.paymentAmount}
                  onChange={contractForm.handleChange}
                />
              </div>
              <div className="w-full space-y-1">
                <Label>Барьцаа мөнгөний хэмжээ</Label>
                <Input
                  type="number"
                  name="deposit"
                  value={contractForm.values.deposit}
                  onChange={contractForm.handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Ашиглалтын зардал байгаа эсэх (байрны төлбөр)</Label>
              <Select
                onValueChange={(value) =>
                  contractForm.setFieldValue("utilityIncluded", value)
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Сонгох"
                    defaultValue={contractForm.values.utilityIncluded}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Тийм</SelectItem>
                  <SelectItem value="no">Үгүй</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Нэмэлт</Label>
              <Textarea
                name="additional"
                value={contractForm.values.additional}
                onChange={contractForm.handleChange}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="bg-[#7065F0] cursor-pointer text-white mt-4"
            >
              Гэрээнд оруулах
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
