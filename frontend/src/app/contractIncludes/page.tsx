"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";

interface ContractFormValues {
  rentalPeriod: number;
  paymentType: string;
  paymentAmount: number;
  deposit: number;
  utilityIncluded: string;
  others: string[];
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
      others: [],
    },
    validationSchema: yup.object({}), // Add rules here if needed
    onSubmit: async (values) => {
      localStorage.setItem("contract", JSON.stringify(values));
      localStorage.removeItem("contractRequest");
      router.push("/");
    },
  });

  const handleCheckboxChange = (item: string, isChecked: boolean) => {
    const currentOthers = [...contractForm.values.others];

    if (isChecked && !currentOthers.includes(item)) {
      contractForm.setFieldValue("others", [...currentOthers, item]);
    } else if (!isChecked && currentOthers.includes(item)) {
      contractForm.setFieldValue(
        "others",
        currentOthers.filter((value) => value !== item)
      );
    }
  };

  const renderCheckbox = (items: string[]) => (
    <div className="space-y-2">
      {items.map((feature) => (
        <div key={feature} className="flex items-center gap-1.5">
          <Checkbox
            id={feature}
            className="cursor-pointer"
            checked={contractForm.values.others.includes(feature)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(feature, checked === true)
            }
          />

          <Label htmlFor={feature} className="text-sm cursor-pointer">
            {feature}
          </Label>
        </div>
      ))}
    </div>
  );
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

            <div className="items-start flex">
              <div className="w-64">
                <Label>Засвар үйлчилгээний үүрэг:</Label>
              </div>
              {renderCheckbox(maintenances)}
            </div>
            <div className="items-start flex">
              <div className="w-64">
                <Label>Гэрээ цуцлах нөхцөл:</Label>
              </div>
              {renderCheckbox(conditionsContract)}
            </div>
            <div className="items-start flex">
              <div className="w-64">
                <Label>Гэрээг сунгах боломж:</Label>
              </div>
              {renderCheckbox(renewContract)}
            </div>
            <div className="items-start flex">
              <div className="w-64">
                <Label>Хориотой үйлдэл:</Label>
              </div>
              {renderCheckbox(forbiddenAct)}
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
const maintenances = [
  "Түрээслэгч урсгал засварыг хариуцна",
  "Түрээслүүлэгч бүх төрлийн засварыг хариуцна",
  "Томоохон гэмтлийн засварыг түрээслүүлэгч хариуцна",
];
const conditionsContract = [
  "Гэрээг урьдчилан 30 хоногийн мэдэгдлээр цуцлах боломжтой",
  "Гэрээг зөвхөн хугацаа дуусмагц цуцална",
  "Цуцлах тохиолдолд торгууль төлөх нөхцөлтэй",
];
const renewContract = [
  "Түрээсийн хугацаа дуусмагц гэрээг сунгах боломжтой",
  "Гэрээг зөвхөн шинэ гэрээ байгуулж сунгана",
  "Автомат сунгалт хийх нөхцөлтэй",
];
const forbiddenAct = [
  "Гэрт тэжээвэр амьтан оруулахыг хориглоно",
  "Өөр этгээдэд түрээслэхийг хориглоно",
  "Бизнесийн зориулалтаар ашиглахыг хориглоно",
];
