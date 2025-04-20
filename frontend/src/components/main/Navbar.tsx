"use client";
import { Button } from "../ui/button";
import { BiWorld } from "react-icons/bi";

import { RiHome6Fill } from "react-icons/ri";
import { AuthDialog } from "./AuthDialog";
import { useAuth } from "../utils/authProvider";
import { useRouter } from "next/navigation";
export const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleCreate = () => {
    router.push("/createApartment");
  };

  const handleHome = () => {
    router.push("/");
  };
  return (
    <div>
      <div className="w-full border h-[70px] flex flex-row items-center p-3 justify-between">
        <div className="flex-1 flex flex-row gap-1">
          <BiWorld className="w-7 h-7" />
          <h1 className="font-bold text-xl text-[#1D175D]">Монгол</h1>
        </div>
        <div
          onClick={handleHome}
          className="flex-1 flex flex-row gap-1 justify-center cursor-pointer"
        >
          <RiHome6Fill className="w-7 h-7 text-[#7065F0]" />
          <h1 className="font-bold text-xl">HomeLink</h1>
        </div>
        <div className="flex-1 text-end space-x-2">
          {user ? (
            <Button
              onClick={logout}
              className="h-[50px] bg-white text-black border hover:bg-red-400 hover:text-white cursor-pointer"
            >
              гарах
            </Button>
          ) : (
            <AuthDialog />
          )}
          {user?.role == "owner" && (
            <Button
              onClick={handleCreate}
              className="h-[50px] bg-white text-black border hover:bg-[#7065F0] hover:text-white cursor-pointer"
            >
              Орон сууц нэмэх
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
