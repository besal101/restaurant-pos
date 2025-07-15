export interface SalesData {
  name: string;
  value: number;
}

export interface PieData {
  name: string;
  value: number;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  ingredients?: string;
  allergens?: string;
  available?: boolean;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
