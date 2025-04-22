"use client";
import { Footer, GeneralInfo, Navbar } from "@/components/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/utils/authProvider";
import { api } from "@/lib/axios";
import { ApartmentType } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApartmentIdPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [apartment, setApartment] = useState<ApartmentType>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/apartment/${id}`);
        setApartment(response.data.apartment);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleCreateContract = () => {
    localStorage.setItem("contractRequest", id ? id.toString() : "1");
    toast.info("Гэрээ байгууллах хүсэлт илгээгдлээ");
  };

  return (
    <div>
      <Navbar />
      <div className="space-y-5">
        <div className="w-[900px] m-auto space-y-4 mt-12 relative">
          <div className="relative w-full h-96">
            <Image
              src={
                apartment?.images[0] ||
                "https://res.cloudinary.com/dnpwi1bxt/image/upload/v1737948707/samples/landscapes/architecture-signs.jpg"
              }
              alt="Map preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="h-36 flex gap-4">
            {apartment?.images.slice(1, 5).map((img, i) => (
              <div key={i} className="relative w-full h-full">
                <Image
                  src={
                    img ||
                    "https://res.cloudinary.com/dnpwi1bxt/image/upload/v1737948707/samples/landscapes/architecture-signs.jpg"
                  }
                  alt="Map preview"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {user?.role != "owner" && (
            <div className="absolute w-60 h-[360px] top-0 -right-[300px] border rounded-lg shadow-lg text-center flex flex-col items-center p-2">
              <div className="w-32 h-32 rounded-full overflow-hidden relative">
                <Image
                  src={
                    "https://res.cloudinary.com/dqhguhv7o/image/upload/v1745217706/images_uuqsax.png"
                  }
                  alt="user"
                  fill
                  className="object-cover"
                />
              </div>
              <div>Бат</div>
              <p className="text-muted-foreground">
                Үл хөдлөх хөрөнгийн мэргэжилтэн
              </p>
              <div className="space-y-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-40 cursor-pointer bg-green-600">
                      ХОЛБОГДОХ
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Холбоо барих</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <Label>И-Мэйл:</Label>
                      <p>{user?.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Label>Утасны дугаар:</Label>
                      <p>{user?.phoneNumber}</p>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-40 cursor-pointer border border-[#434FAA] text-[#434FAA] bg-white">
                      МЕССЕЖ ИЛГЭЭХ
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Мессеж илгээх</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 relative rounded-full overflow-hidden">
                        <Image
                          src={
                            "https://res.cloudinary.com/dqhguhv7o/image/upload/v1745217706/images_uuqsax.png"
                          }
                          alt="user"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Бат</p>
                        <p className="text-sm text-gray-500">
                          Үл хөдлөх хөрөнгийн мэргэжилтэн
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-200 p-2 rounded-md text-sm text-black mt-4">
                      Сайн байна уу? Та 0-1234 дугаарт зарын талаар асууж лавлах
                      боломжтой.
                    </div>
                    <Input placeholder="Your message..." className="mt-4" />
                    <DialogClose asChild>
                      <Button className="mt-2 cursor-pointer bg-green-600 text-white">
                        Илгээх
                      </Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={handleCreateContract}
                  className="w-40 cursor-pointer border border-[#434FAA] text-[#434FAA] bg-white"
                >
                  ГЭРЭЭ БАЙГУУЛАХ
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-10">
          <GeneralInfo apartment={apartment} />
        </div>
        <Card className="w-[900px] mx-auto p-6 shadow-lg rounded-2xl border border-gray-200">
          <CardContent className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Дэлгэрэнгүй</h2>
            <p className="text-muted-foreground">{apartment?.description}</p>
          </CardContent>
        </Card>
        <Card className="w-[900px] mx-auto p-6 shadow-lg rounded-2xl border border-gray-200">
          <CardContent className="flex gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                Интерьерийн онцлог
              </h2>
              {apartment?.interiorCategory?.split(",").map((item, index) => (
                <p
                  key={index}
                  className="text-muted-foreground flex items-center gap-1"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_37_681)">
                      <path
                        d="M9.88771 1.31939C9.73424 1.16048 9.48102 1.15608 9.32212 1.30955C9.31879 1.31276 9.31551 1.31604 9.31227 1.31939L2.79508 7.8366L0.677882 5.7194C0.518976 5.56593 0.265758 5.57034 0.112289 5.72924C-0.0374297 5.88426 -0.0374297 6.13 0.112289 6.28502L2.51229 8.68502C2.6685 8.84118 2.92169 8.84118 3.07788 8.68502L9.87787 1.88501C10.0368 1.73151 10.0412 1.4783 9.88771 1.31939Z"
                        fill="black"
                        fillOpacity="0.5"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_37_681">
                        <rect width="10" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  {item.trim()}
                </p>
              ))}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">Бусад</h2>
              {apartment?.otherCategory?.split(",").map((item, index) => (
                <p
                  key={index}
                  className="text-muted-foreground flex items-center gap-1"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_37_681)">
                      <path
                        d="M9.88771 1.31939C9.73424 1.16048 9.48102 1.15608 9.32212 1.30955C9.31879 1.31276 9.31551 1.31604 9.31227 1.31939L2.79508 7.8366L0.677882 5.7194C0.518976 5.56593 0.265758 5.57034 0.112289 5.72924C-0.0374297 5.88426 -0.0374297 6.13 0.112289 6.28502L2.51229 8.68502C2.6685 8.84118 2.92169 8.84118 3.07788 8.68502L9.87787 1.88501C10.0368 1.73151 10.0412 1.4783 9.88771 1.31939Z"
                        fill="black"
                        fillOpacity="0.5"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_37_681">
                        <rect width="10" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  {item.trim()}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="w-[900px] mx-auto p-6 shadow-lg rounded-2xl border border-gray-200 mb-4">
          <CardContent className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Байршлын мэдээлэл
            </h2>
            {apartment?.latitude && apartment?.longitude && (
              <iframe
                src={`https://maps.google.com/maps?q=${apartment.latitude},${apartment.longitude}&z=15&output=embed`}
                width="800"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
