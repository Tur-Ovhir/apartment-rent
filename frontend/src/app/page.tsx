"use client";

import { Caraousel, Footer, Navbar, Card, Map } from "@/components/main";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/utils/authProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    const contract = localStorage.getItem("contract");
    const contractRequest = localStorage.getItem("contractRequest");
    if (contractRequest && user?.role == "owner") {
      toast.info(
        <div className="flex items-center gap-2">
          <p>{1} дугаартай байранд түрээслэх хүсэлт ирсэн байна.</p>
          <Button
            onClick={() => router.push("/contractIncludes")}
            className="bg-[#7065F0] cursor-pointer"
          >
            Гэрээ
          </Button>
        </div>
      );
    }
    if (contract && user?.role == "renter") {
      toast.info(
        <div className="flex items-center gap-2">
          <p>{1} дугаартай байранд түрээслэх хүсэлтийг хянсан байна.</p>
          <Button
            onClick={() => router.push("/CreateContract")}
            className="bg-[#7065F0] cursor-pointer"
          >
            Гэрээ
          </Button>
        </div>
      );
    }
  }, [user]);
  return (
    <div>
      <Navbar />
      <Caraousel />
      <div className="max-w-[1200px] m-auto">
        <Card isHighlight={true} />
        <Card isHighlight={false} />
        <Map />
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}
