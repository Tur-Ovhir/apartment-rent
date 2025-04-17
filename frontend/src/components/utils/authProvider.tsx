"use client";

import { api } from "@/lib/axios";
import { userType } from "@/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthContextType {
  user: userType | null;
  login: (name: string, password: string) => void;
  register: (
    email: string,
    phoneNumber: string,
    role: string,
    password: string,
    title: string
  ) => void;
  logout: () => void;
  loading: boolean;
  isReady: boolean;
}
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<userType | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      setLoading(false);
      setUser(res.data.user);

      setIsReady(true);
      toast.success("Амжилттай нэвтэрлээ");
      router.replace("/");
    } catch (error) {
      console.error(error);
      toast.error("И-мэйл нууц үг буруу!!!");
    }
  };

  const register = async (
    email: string,
    phoneNumber: string,
    role: string,
    password: string,
    title: string
  ) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        email,
        phoneNumber,
        role,
        title,
        password,
      });
      localStorage.setItem("token", res.data.token);

      setLoading(false);
      setUser(res.data.user);

      setIsReady(true);
      toast.success("Амжилттай бүртгэгдлээ");
      router.replace("/");
    } catch (error) {
      console.error(error);
      toast.error("Мэдээлэл буруу!!!");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/");
    toast.warning("Амжилттай гарлаа");
  };

  const getMe = async () => {
    const token = localStorage.getItem("token");
    try {
      setIsReady(false);

      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsReady(true);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      toast.error("Хэрэглэгчийн мэдээлэл буруу!");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe();
    } else {
      setIsReady(false);
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, isReady }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
