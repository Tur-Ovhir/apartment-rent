import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
interface OneCardProps {
  id: number;
  image: string;
  price: number;
  title: string;
  location: string;
  isHighlight: boolean;
  area: number;
  rooms: number;
  floor: number;
  createdAt: string;
}
export const OneCard = ({
  id,
  image,
  price,
  title,
  location,
  isHighlight,
  area,
  rooms,
  floor,
  createdAt,
}: OneCardProps) => {
  const router = useRouter();

  const handleApartment = () => {
    router.push(`/apartment/${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} оны ${month} сарын ${day} өдөр`;
  };
  const [liked, setLiked] = useState(false);

  return (
    <Card
      onClick={handleApartment}
      className="w-full p-[10px] shadow-xl rounded-2xl border border-gray-200"
    >
      <CardContent className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={
              image ||
              "https://res.cloudinary.com/dykm0aphm/image/upload/v1744444071/Screenshot_2025-04-12_at_15.47.34_irlwad.png"
            }
            alt="Phone with map"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative space-y-2">
          {isHighlight && (
            <div
              onClick={() => setLiked(!liked)}
              className={`absolute top-2 right-2 w-[30px] h-[30px] border-2 border-[#E8E6F9] flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 bg-white 
          `}
            >
              <CiHeart className="hover:bg-[#7065F0] rounded-xl" size={18} />
            </div>
          )}
          <h2 className="text-2xl font-bold mt-2">{price.toLocaleString()}₮</h2>
          <p className="m">{title}</p>
          <p className="text-gray-600 text-xs">{location}</p>
          <p className="text-gray-600 text-xs">{formatDate(createdAt)}</p>
          <div className="flex items-center">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3125 12.5938V8.375H4.6875V12.5938C4.6875 12.875 4.5 13.0625 4.21875 13.0625H10.7812C10.5 13.0625 10.3125 12.875 10.3125 12.5938Z"
                fill="black"
              />
              <path
                d="M12.6562 5.14062V2.65625C12.6562 1.4375 11.625 0.40625 10.4062 0.40625H4.59375C3.375 0.40625 2.34375 1.4375 2.34375 2.65625V5.14062C1.54688 5.32812 0.9375 6.07812 0.9375 6.96875V11.6562C0.9375 12.4531 1.54688 13.0625 2.34375 13.0625H4.21875C3.9375 13.0625 3.75 12.875 3.75 12.5938V6.96875C3.75 6.45312 3.32812 6.03125 2.8125 6.03125C2.53125 6.03125 2.34375 5.84375 2.34375 5.5625C2.34375 5.28125 2.53125 5.09375 2.8125 5.09375C3.84375 5.09375 4.6875 5.9375 4.6875 6.96875V7.4375H10.3125V6.96875C10.3125 5.9375 11.1562 5.09375 12.1875 5.09375C12.4688 5.09375 12.6562 5.28125 12.6562 5.5625C12.6562 5.84375 12.4688 6.03125 12.1875 6.03125C11.6719 6.03125 11.25 6.45312 11.25 6.96875V12.5938C11.25 12.875 11.0625 13.0625 10.7812 13.0625H12.6562C13.4531 13.0625 14.0625 12.4531 14.0625 11.6562V6.96875C14.0625 6.07812 13.4531 5.375 12.6562 5.14062Z"
                fill="black"
              />
            </svg>

            <p className="ml-1 mr-3">{rooms}</p>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2378 2.95752H11.4976C11.0766 2.95752 10.7354 3.29846 10.7354 3.71961V5.69791H8.75714C8.336 5.69791 7.99481 6.03873 7.99481 6.45991V8.43834H6.0165C5.59536 8.43834 5.25429 8.77965 5.25429 9.20036V11.2741H3.18103C2.97873 11.2741 2.78487 11.3543 2.642 11.497C2.499 11.6399 2.41879 11.8346 2.41879 12.0361L2.41904 13.6306C2.41904 14.0521 2.76035 14.393 3.18125 14.393H14.2378C14.659 14.393 15 14.0521 15 13.6306V3.71957C15 3.29846 14.659 2.95752 14.2378 2.95752Z"
                fill="black"
              />
              <path
                d="M10.2266 0.760897C10.0304 0.559802 9.70912 0.555937 9.50814 0.751591C6.24859 3.92683 3.14766 7.02813 0.148905 10.0266C0.0534895 10.122 0 10.2516 0 10.3862V13.8636C0 14.1438 0.227408 14.3718 0.508119 14.3718C0.788553 14.3718 1.01636 14.1439 1.01636 13.8636V10.5964C3.96645 7.64623 7.01643 4.59783 10.2171 1.47939C10.418 1.28376 10.4221 0.961869 10.2266 0.760897Z"
                fill="black"
              />
            </svg>
            <p className="ml-1 mr-3">{floor}</p>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9927 2.12696H3.00712C2.57476 2.12696 2.22303 2.47847 2.22303 2.91058V12.0895C2.22303 12.5218 2.57455 12.8735 3.00712 12.8735H11.9927C12.4249 12.8735 12.7766 12.522 12.7766 12.0895V2.91058C12.7764 2.47847 12.4249 2.12696 11.9927 2.12696ZM9.28364 9.36396H7.77209V5.94526L6.45737 8.0312L5.14787 5.94526V9.36418H3.64074V3.29503H5.14787L6.45737 5.38098L7.77209 3.29503H9.28364V9.36396ZM13.4629 0H1.53676C0.758887 0 0.128052 0.630799 0.128052 1.40856V13.5911C0.128052 14.3692 0.758887 15 1.53676 15H13.4631C14.241 15 14.8718 14.3692 14.8718 13.5911V1.40856C14.8718 0.630799 14.241 0 13.4629 0ZM13.332 12.0895C13.332 12.8278 12.7312 13.4288 11.9927 13.4288H3.00712C2.26872 13.4288 1.66772 12.828 1.66772 12.0895V2.91058C1.66772 2.17243 2.26851 1.57139 3.00712 1.57139H11.9927C12.731 1.57139 13.332 2.17218 13.332 2.91058V12.0895Z"
                fill="black"
              />
            </svg>

            <p className="ml-1 mr-3">{area}м²</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
