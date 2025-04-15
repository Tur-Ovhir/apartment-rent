"use client"
import { Caraousel, Card, Footer, Map, Navbar } from "@/components/main";

export default function HomePage () {
    return(
        <div>
            <Navbar/>
            <Caraousel/>
            <Card/>
            <Map/>
            <div className="mt-5">
            <Footer/>
            </div>    
        </div>
    )
}