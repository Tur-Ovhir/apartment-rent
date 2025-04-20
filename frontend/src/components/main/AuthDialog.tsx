"use client";

import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { RiHome6Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/utils/authProvider";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface LoginFormValues {
  email: string;
  password: string;
}
interface RegisterFormValues {
  email: string;
  phoneNumber: string;
  role: string;
  title: string;
  password: string;
  confirmPassword: string;
}

export const AuthDialog = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("renter");
  const { login, register } = useAuth();

  const loginForm = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Зөв имэйл хаяг оруулна уу")
        .required("Имэйл хаягаа оруулна уу"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Нууц үгээ оруулна уу"),
    }),
    onSubmit: async (values) => {
      login(values.email, values.password);
    },
  });

  const registerForm = useFormik<RegisterFormValues>({
    initialValues: {
      email: "",
      phoneNumber: "",
      role: role,
      title: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Зөв имэйл хаяг оруулна уу")
        .required("Имэйл хаягаа оруулна уу"),
      phoneNumber: yup.string().required("Утасны дугаараа оруулна уу"),
      password: yup
        .string()
        .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой")
        .required("Нууц үгээ оруулна уу"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Нууц үг таарахгүй байна")
        .required("Нууц үгээ давтан оруулна уу"),
    }),
    onSubmit: async (values) => {
      register(
        values.email,
        values.phoneNumber,
        values.role,
        values.password,
        values.title
      );
    },
  });

  const handleIsLogin = () => {
    setIsLogin(!isLogin);
  };
  const handleRoleChange = (value: string) => {
    setRole(value);
    registerForm.setFieldValue("role", value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-[50px] bg-white text-black border hover:bg-[#7065F0] hover:text-white cursor-pointer"
        >
          Нэвтрэх
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit}>
            <div className="flex flex-row gap-1 justify-center pb-8">
              <RiHome6Fill className="w-7 h-7 text-[#7065F0]" />
              <h1 className="font-bold text-xl">HomeLink</h1>
            </div>
            <Input
              id="email"
              type="email"
              placeholder="И-мэйл"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3"
            />
            <Input
              id="password"
              type="password"
              placeholder="Нууц үг"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 rounded-md mb-4 hover:bg-blue-500 transition mt-3 cursor-pointer"
            >
              Нэвтрэх
            </Button>
            <div className="w-full flex justify-center">
              <Label>Бүртгэлтэй хэрэглэгч биш үү?</Label>
              <button
                className="text-blue-400 cursor-pointer hover:underline ml-2"
                onClick={handleIsLogin}
              >
                Бүртгүүлэх
              </button>
            </div>
            <div className="flex items-center justify-between my-4">
              <hr className="w-1/3" />
              <span className="text-gray-500 text-sm">or</span>
              <hr className="w-1/3" />
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition">
              <FcGoogle size={20} />
              Connect with Google
            </button>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit}>
            <div className="flex flex-row gap-1 justify-center pb-8">
              <RiHome6Fill className="w-7 h-7 text-[#7065F0]" />
              <h1 className="font-bold text-xl">HomeLink</h1>
            </div>
            <Tabs
              defaultValue="renter"
              className="w-full"
              onValueChange={handleRoleChange}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="renter">Түрээслэгч</TabsTrigger>
                <TabsTrigger value="owner">Түрээслүүлэгч</TabsTrigger>
              </TabsList>
              <TabsContent value="renter">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="И-мэйл"
                  value={registerForm.values.email}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3"
                />
                {registerForm.touched.email && registerForm.errors.email && (
                  <div className="text-red-500 text-sm mb-2">
                    {registerForm.errors.email}
                  </div>
                )}
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Утасны дугаар"
                  value={registerForm.values.phoneNumber}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {registerForm.touched.phoneNumber &&
                  registerForm.errors.phoneNumber && (
                    <div className="text-red-500 text-sm mb-2">
                      {registerForm.errors.phoneNumber}
                    </div>
                  )}
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Нууц үг"
                  value={registerForm.values.password}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {registerForm.touched.password &&
                  registerForm.errors.password && (
                    <div className="text-red-500 text-sm mb-2">
                      {registerForm.errors.password}
                    </div>
                  )}
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Нууц үгээ давтах"
                  value={registerForm.values.confirmPassword}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {registerForm.touched.confirmPassword &&
                  registerForm.errors.confirmPassword && (
                    <div className="text-red-500 text-sm mb-2">
                      {registerForm.errors.confirmPassword}
                    </div>
                  )}
              </TabsContent>
              <TabsContent value="owner">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="И-мэйл"
                  value={registerForm.values.email}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3"
                />
                {registerForm.touched.email && registerForm.errors.email && (
                  <div className="text-red-500 text-sm mb-2">
                    {registerForm.errors.email}
                  </div>
                )}
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Утасны дугаар"
                  value={registerForm.values.phoneNumber}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {registerForm.touched.phoneNumber &&
                  registerForm.errors.phoneNumber && (
                    <div className="text-red-500 text-sm mb-2">
                      {registerForm.errors.phoneNumber}
                    </div>
                  )}
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Байрны эзэн"
                  value={registerForm.values.title}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Нууц үг"
                  value={registerForm.values.password}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {registerForm.touched.password &&
                  registerForm.errors.password && (
                    <div className="text-red-500 text-sm mb-2">
                      {registerForm.errors.password}
                    </div>
                  )}
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Нууц үгээ давтах"
                  value={registerForm.values.confirmPassword}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {registerForm.touched.confirmPassword &&
                  registerForm.errors.confirmPassword && (
                    <div className="text-red-500 text-sm mb-2">
                      {registerForm.errors.confirmPassword}
                    </div>
                  )}
              </TabsContent>
            </Tabs>
            <Button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 rounded-md mb-4 hover:bg-blue-500 transition mt-3 cursor-pointer"
            >
              Бүртгүүлэх
            </Button>
            <div className="w-full flex justify-center">
              <Label>Бүртгэлтэй хэрэглэгч үү?</Label>
              <button
                className="text-blue-400 cursor-pointer hover:underline ml-2"
                onClick={handleIsLogin}
              >
                Нэвтрэх
              </button>
            </div>
            <div className="flex items-center justify-between my-4">
              <hr className="w-1/3" />
              <span className="text-gray-500 text-sm">or</span>
              <hr className="w-1/3" />
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition">
              <FcGoogle size={20} />
              Connect with Google
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
