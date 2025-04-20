export type userType = {
  id: number;
  email: string;
  phoneNumber: string;
  name: string;
  avatar: string;
  title: string;
  role: string;
};

export type ApartmentType = {
  id: number;
  title: string;
  price: number;
  rooms: number;
  bathrooms: number;
  area: number;
  builtYear: number;
  floor: number;
  isFurnished: boolean;
  isHighlight: boolean;
  facing?: string;
  description?: string;
  location: string;
  latitude: string;
  longitude: string;
  interiorCategory?: string;
  otherCategory?: string;
  ownerId: number;
  createdAt: string;
  images: string[];
};
