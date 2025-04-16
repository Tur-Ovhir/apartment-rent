"use client"
import { Navbar, RentContract } from "@/components/main"
export default function TenantPage () {
    return(
        <div>
            <Navbar/>
            <div className="mt-10">     
            <RentContract/>
            </div>
        </div>
    )
}