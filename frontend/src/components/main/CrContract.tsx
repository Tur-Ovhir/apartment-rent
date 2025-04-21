"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ContractFormValues {
  rentalPeriod: number;
  paymentType: string;
  paymentAmount: number;
  deposit: number;
  utilityIncluded: string;
  additional: string;
}

export const CrContract = () => {
  const [contract, setContract] = useState<ContractFormValues | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedContract = localStorage.getItem("contract");
    if (storedContract) {
      setContract(JSON.parse(storedContract));
    }
  }, []);

  const sections = [
    { id: "goal", title: "1. Гэрээний зорилго" },
    { id: "duration", title: "2. Гэрээний хугацаа ба төлбөр" },
    { id: "rights", title: "3. Түрээслүүлэгчийн үүрэг, эрх" },
    { id: "lessee", title: "4. Түрээслэгчийн үүрэг, хязгаарлалт" },
    { id: "disputes", title: "5. Зөрчил, алданги, маргааны шийдвэрлэл" },
    { id: "termination", title: "6. Гэрээ цуцлах нөхцөл" },
    {
      id: "validity",
      title: "7. Гэрээ хүчин төгөлдөр болох ба өөрчлөлт оруулах",
    },
  ];

  const handleRenterContract = () => {
    localStorage.removeItem("contract");
    router.push("/");
    toast.success("Гэрээ амжилттай үүслээ");
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 gap-10">
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold mb-2">Түрээсийн гэрээ байгуулах</h1>

        {sections.map(({ id, title }) => (
          <div key={id} id={id} className="scroll-mt-24">
            <h2 className="text-lg font-bold mb-1 ">{title}</h2>
            <p className="text-sm text-gray-700 leading-relaxed font-light">
              {getContentById(id, contract)}
            </p>
          </div>
        ))}

        <div className="mt-6">
          <Label className="flex items-center space-x-2 text-sm">
            <Checkbox className="h-5 w-5 border border-black" />
            <h1 className="font-light">Гэрээний нөхцөлтэй танилцсан</h1>
          </Label>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="border-[1px] h-full"></div>
      </div>
      <div className="w-full md:w-1/3 space-y-4 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="hover:bg-[#7065F0]">
            ДАН баталгаажуулалт
          </Button>
          <Button
            onClick={handleRenterContract}
            className="text-black bg-white cursor-pointer hover:bg-[#7065F0] border"
          >
            Гэрээ байгуулах
          </Button>
        </div>
        <div className="justify-center flex">
          <Button variant="ghost" className="border hover:bg-[#7065F0]">
            📄 PDF татах
          </Button>
        </div>
      </div>
    </div>
  );
};

function getContentById(
  id: string,
  contract: ContractFormValues | null
): string {
  if (!contract) return "";

  switch (id) {
    case "goal":
      return `Энэхүү гэрээ нь хоёр талын харилцан тохиролцсон нөхцлийн дагуу тодорхой хугацаанд хөрөнгө түрээслэх, түүнийг ашиглахтай холбоотой эрх, үүрэг, хариуцлагыг зохицуулах зорилготой юм.  
Түрээслүүлэгч нь өөрийн өмчлөлд байгаа хөрөнгийг Түрээслэгчийн эзэмшил, ашиглалтанд шилжүүлж, харин Түрээслэгч нь тухайн хөрөнгийг зориулалтын дагуу ашиглаж, тохиролцсон хугацаанд түрээсийн төлбөрийг бүрэн төлөх үүрэгтэй.`;
    case "duration":
      return `Гэрээний хүчинтэй хугацаа нь гэрээнд тусгагдсан огнооноос эхлэн тодорхой сар буюу жилээр үргэлжилнэ.  
Түрээслэгч нь ${contract.rentalPeriod || "____"} сар бүр ${
        contract.paymentAmount || "____"
      }₮ төлөх бөгөөд нийт ${
        contract.paymentAmount && contract.rentalPeriod
          ? contract.paymentAmount * contract.rentalPeriod
          : "____"
      }₮-ийг гэрээний хугацаанд бүрэн барагдуулах үүрэгтэй.`;
    case "rights":
      return `Түрээслүүлэгч нь хөрөнгийг ашиглах боломжтой, эрхийн болон биеэ зөвшөөрсөн нөхцөлтэйгөөр түрээслэгчид хүлээлгэн өгөх үүрэгтэй. Мөн гэрээний үүрэг зөрчигдсөн тохиолдолд хохирлыг нөхөн төлүүлэх эрхтэй.`;
    case "lessee":
      return `Түрээслэгч нь хөрөнгийг гэрээнд заасан зориулалтын дагуу ашиглах, төлбөрийг хугацаанд нь төлөх, гэрээ дууссаны дараа хөрөнгийг хэвийн байдалтайгаар буцаан өгөх үүрэгтэй.`;
    case "disputes":
      return `Хэрэв гэрээний заалт зөрчигдвөл гэрээнд гаргасан тал нь гэрээний нийт үнийн дүнгийн 0.1%-ийг хоног тутам алданги болгон төлнө. Маргаан гарсан тохиолдолд эвийн журмаар шийдвэрлэж, боломжгүй бол арбитрын журмаар шийдвэрлэнэ.`;
    case "termination":
      return `Хэрэв аль нэг тал гэрээний үүргээ биелүүлээгүй бол гэрээ нэг талын санаачилгаар цуцлагдаж болно. Цуцлалтын тохиолдолд буруутай тал хохирлыг барагдуулж ба түрээслэгч нь 7 хоногийн дотор хөрөнгийг буцаан өгнө.`;
    case "validity":
      return `Гэрээ нь талууд гарын үсэг зурсан өдрөөс хүчин төгөлдөр болно. Нэмэлт, өөрчлөлтийг зөвхөн бичгээр, талуудын гарын үсгээр баталгаажуулна.`;
    default:
      return "";
  }
}
