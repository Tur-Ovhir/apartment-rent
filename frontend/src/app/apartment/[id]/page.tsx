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
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/apartment/${id}`);
        setApartment(response.data.apartment);
        setSelectedImage(response.data.apartment?.images?.[0]);
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
      <div className="space-y-5 ">
        <div className="w-[900px] m-auto mt-12 flex  gap-4 relative">
          <div className="flex flex-col  justify-between w-1/3">
            {apartment?.images.slice(0, 5).map((img, i) => (
              <div
                key={i}
                className={`relative w-full h-28 rounded-md overflow-hidden cursor-pointer border ${
                  selectedImage === img
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={
                    img ||
                    "https://res.cloudinary.com/dnpwi1bxt/image/upload/v1737948707/samples/landscapes/architecture-signs.jpg"
                  }
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>

          <div className="relative w-2/3 h-[500px] rounded-md overflow-hidden shadow-lg">
            <Image
              src={
                selectedImage ||
                "https://res.cloudinary.com/dnpwi1bxt/image/upload/v1737948707/samples/landscapes/architecture-signs.jpg"
              }
              alt="Main preview"
              fill
              className="object-cover"
            />
          </div>

          {user?.role !== "owner" && (
            <div className="absolute w-60 h-[360px] top-0 right-[-300px] border rounded-lg shadow-lg text-center flex flex-col items-center p-2">
              <div className="w-32 h-32 rounded-full overflow-hidden relative ">
                <Image
                  src="https://res.cloudinary.com/dqhguhv7o/image/upload/v1745217706/images_uuqsax.png"
                  alt="user"
                  fill
                  className="object-cover"
                />
              </div>
              <div>Бат</div>
              <p className="text-muted-foreground">Түрээслүүлэгч</p>
              <div className="space-y-1 mt-2 ">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-40 cursor-pointer text-lg text-black border bg-white border-[#434FAA] hover:bg-[#7065F0] ">
                      Холбогдох
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
                    <Button className="w-40 cursor-pointer  text-black border bg-white border-[#434FAA] hover:bg-[#7065F0]">
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
                          src="https://res.cloudinary.com/dqhguhv7o/image/upload/v1745217706/images_uuqsax.png"
                          alt="user"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Бат</p>
                        <p className="text-sm text-gray-500">Түрээслүүлэгч</p>
                      </div>
                    </div>
                    <div className="bg-green-200 p-2 rounded-md text-sm text-black mt-4">
                      Сайн байна уу? Та {id} дугаарт зарын талаар асууж лавлах
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
                  className="w-40 cursor-pointer  border  border-black bg-white hover:bg-black hover:text-white text-black"
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
                  <span className="w-2 h-2 bg-black opacity-50 rounded-full"></span>
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
                  <span className="w-2 h-2 bg-black opacity-50 rounded-full"></span>
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
