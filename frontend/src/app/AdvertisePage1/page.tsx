import { GeneralInfo, ImageCarousel, Navbar, Feature, RentLevel } from "@/components/main";

export default function AdvertisePag1 (){
    return(
        <div>
            <Navbar/>
            <div className="mt-5">
            <RentLevel/>
            </div>       
            <div className="mt-5 ">
            <ImageCarousel/>
            </div>   
          <div className="mt-10">
          <GeneralInfo/>
          </div>
           <div className="flex justify-center mt-10">
           <Feature/>
           </div>         
        </div>
    )
}
