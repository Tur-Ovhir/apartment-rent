"Use client";

import { CrContract, Navbar, Footer } from "@/components/main";

export default function CreateContractPage() {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <Navbar />
        <CrContract />
        <Footer />
      </div>
    </div>
  );
}
