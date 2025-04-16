"use client";
import { Contact, Done, EmailOption, RentContract } from "@/components/main";
import LoginPage from "./Login/page";
export default function Home() {
  return (
    <div>
      <div>
        <LoginPage/>
       <Done/>
      </div>
    </div>
  );
}
