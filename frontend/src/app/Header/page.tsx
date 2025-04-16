import { Contact, EmailOption, Navbar, RentLevel } from "@/components/main";
import { Button } from "@/components/ui/button";
export default function HeaderPage (){
    return(
        <div className="border rounded-xl ">
            <Navbar/>
            <div className="mt-15">
            <RentLevel/>
            </div>

            <div className="mt-15">
            <Contact/>
            </div>
           <div className="mt-15">
           <EmailOption/>
           </div>
        
            <div className="flex justify-center mt-15">
                <Button className="bg-white text-black border hover:bg-[#7065F0]">
                 үргэлжлүүлэх
                </Button>
             </div>  
        </div>
    )
}