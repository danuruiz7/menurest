export interface Restaurant {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  logoUrl: string;
  address: string;
  phone: string;
  description: string | null;
  website: string | null;
  slug: string;
}

export interface RestaurantApp {
  name: string;
  logoUrl: string;
  address: string;
  phone: string;
  email: string;
}