"use client"
import { Caraousel, Card, Footer, Map, Navbar } from "@/components/main";
import Link from "next/link";
export default function HomePage () {
    return(
        <div>
            <Navbar/>
            <Caraousel/>
            <Link href="/All">
            <Card/>
            </Link>
         
            <Map/>
            <div className="mt-5">
            <Footer/>
            </div>    
        </div>
    )
}