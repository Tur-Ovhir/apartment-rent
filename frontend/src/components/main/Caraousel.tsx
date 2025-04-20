"use client";

export const Caraousel = () => {
  return (
    <div className="relative w-full h-[452px]">
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dnpwi1bxt/image/upload/v1737948707/samples/landscapes/architecture-signs.jpg')] bg-cover bg-center z-0" />
      <div className="absolute inset-0 bg-black opacity-30 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-2xl font-bold">Төгс орон сууцаа олоорой.</h1>
        <h5>Таны хэрэгцээнд нийцсэн орон сууцыг олоход бид тусалъя.</h5>
      </div>
    </div>
  );
};
