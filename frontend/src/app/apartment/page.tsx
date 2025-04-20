"use client";
import { FeatureCard, Footer, Navbar, Option } from "@/components/main";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

export const ApartmentPage = () => {
  const [apartments, setApartments] = useState([]);

  const fetchApartments = async (filters = {}) => {
    try {
      const res = await api.get("/apartment", { params: filters });
      setApartments(res.data.apartments);
    } catch (error) {
      console.log("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <Navbar />

      <div className="w-[1200px] m-auto">
        <Option onFilter={fetchApartments} />
        <FeatureCard apartments={apartments} />
      </div>
      <Footer />
    </div>
  );
};
