"use client";

import { Caraousel, Footer, Navbar, Card, Map } from "@/components/main";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Caraousel />
      <Link href="/All">
        <Card />
      </Link>

      <Map />
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}
