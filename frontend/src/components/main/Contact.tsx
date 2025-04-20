"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";

export const Contact = () => {
  return (
    <Card className="w-[900px] mx-auto p-6 shadow-xl rounded-2xl border border-gray-200">
      <CardContent className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Холбоо барих</h2>
        <div className="flex flex-col gap-2">
          <div className="w-45">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
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
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
              <Label
                htmlFor="phone1"
                className="block text-sm font-medium text-gray-700"
              >
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
              <Label
                htmlFor="phone2"
                className="block text-sm font-medium text-gray-700"
              >
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
      </CardContent>
    </Card>
  );
};
