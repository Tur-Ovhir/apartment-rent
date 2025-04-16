"use client"

import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const  Contact =() => {
    return (
      <div className="max-w-xl mx-auto p-6 border rounded-xl w-full">
        <h1 className="text-2xl font-bold mb-6">Холбоо барих</h1>
        <div className="flex flex-col gap-2">
          <div className="w-45">
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Нэр
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
  
          <div className="w-45">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

        <div className="flex flex-row gap-3 ">
          <div>
            <Label htmlFor="phone1" className="block text-sm font-medium text-gray-700">
              Утасны дугаар
            </Label>
            <Input
              type="text"
              id="phone1"
              name="phone1"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
  
          <div>
            <Label htmlFor="phone2" className="block text-sm font-medium text-gray-700">
              Утасны дугаар 2
            </Label>
            <Input
              type="text"
              id="phone2"
              name="phone2"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        </div>
      </div>
    );
  }