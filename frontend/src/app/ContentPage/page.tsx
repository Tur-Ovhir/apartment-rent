import { Feature, Footer, GeneralInfo, LivingRoom, MapNotit, Navbar } from "@/components/main";

export default function ContentPage (){
    return(
        <div className="flex flex-col gap-10 justify-center">
            <Navbar/>
            <LivingRoom/>           
            <GeneralInfo/>
          
            <Feature/>
        
            <MapNotit/>                   
            <Footer/>
        </div>
    )
}