export interface InfoType {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface ProductType {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface ResponseType {
  limit: number;
  skip: number;
  total: number;
  products: ProductType[];
}
