/* export interface ResponseType {
  info: InfoType;
  results: CharacterType[];
} */

export interface CharacterType {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

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
