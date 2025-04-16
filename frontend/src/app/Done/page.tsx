import { Done, Navbar, RentLevel } from "@/components/main";

export default function DonePage () {
    return(
        <div>
            <Navbar/>
            <div className="mt-15">
                <RentLevel/>
            </div>
            <div className="mt-15">
            <Done/>
            </div>     
        </div>
    )
}