import { FeatureCard, Footer, Navbar, Option } from "@/components/main"
export default function AllPage (){
    return(
        <div className="flex flex-col gap-4">
           <Navbar/>
           <Option/>
           <FeatureCard/>
           <Footer/>
        </div>
    )
}