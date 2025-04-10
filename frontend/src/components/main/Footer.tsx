"use client";
export const Footer = () => {
  return (
    <div className="">
      <div className="w-full h-[290px] border bg-[#2D363C] flex flex-row gap-96 text-[#969A9D]  items-center p-5">
        <div className="flex flex-col gap-1 ml-20 ">
          <h1 className="text-white text-xl">Бидний тухай</h1>
          <h3>Бидний тухай</h3>
          <h3>Ашиглах нөхцөл</h3>
          <h3>Нууцлалын бодлого</h3>
          <h3>Зарын дүрэм</h3>
        </div>
        <div className="flex flex-col gap-1 ">
          <h1 className="text-white text-xl"> Үйлчилгээ</h1>
          <h3> Хэрэглэгчийн үйлчилгээ</h3>
          <h3>Үнэгүй зар суртчилгаа</h3>
          <h3> Газрын зураг дээр хайх</h3>
        </div>
        <div className="flex flex-col gap-1 ">
          <h1 className="text-white text-xl"> Холбоо барих</h1>
          <h3>Нийгмийн сүлжээ</h3>
          <h3>Сайтын бүтэц</h3>
          <h3>Холбогдох утас</h3>
        </div>
      </div>
    </div>
  );
};
