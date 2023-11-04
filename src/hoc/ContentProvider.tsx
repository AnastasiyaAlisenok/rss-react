import { ReactNode, createContext, useMemo, useState } from 'react';
import { ProductType } from '../types/types';

type ContentProviderProps = {
  children: ReactNode;
};

interface ContentContextProps {
  products: ProductType[] | undefined;
  setNewProducts: (newProducts: ProductType[]) => void;
  page: number;
  setNewPage: (newPage: number) => void;
  limit: number;
  setNewLimit: (newLimit: number) => void;
  lastPage: number | null | undefined;
  setNewLastPage: (newLastPage: number) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  product: ProductType | undefined;
  setNewProduct: (newProduct: ProductType) => void;
}

export const ContentContext = createContext<ContentContextProps>({
  products: [],
  setNewProducts: () => {},
  page: 1,
  setNewPage: () => {},
  limit: 4,
  setNewLimit: () => {},
  lastPage: null,
  setNewLastPage: () => {},
  loading: true,
  setLoading: () => {},
  product: undefined,
  setNewProduct: () => {},
});

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductType[]>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [lastPage, setLastPage] = useState<number>();
  const [loading, setLoadingPage] = useState(false);
  const [product, setProduct] = useState<ProductType>();

  const setNewProducts = (newProducts: ProductType[]): void => {
    setProducts(newProducts);
  };

  const setNewPage = (newPage: number): void => {
    setPage(newPage);
  };

  const setNewLimit = (newLimit: number): void => {
    setLimit(newLimit);
  };

  const setNewLastPage = (newPage: number): void => {
    setLastPage(newPage);
  };

  const setLoading = (value: boolean): void => {
    setLoadingPage(value);
  };

  const setNewProduct = (newProduct: ProductType): void => {
    setProduct(newProduct);
  };

  const value = useMemo(() => {
    return {
      products,
      setNewProducts,
      page,
      setNewPage,
      limit,
      setNewLimit,
      lastPage,
      setNewLastPage,
      loading,
      setLoading,
      product,
      setNewProduct,
    };
  }, [page, limit, products, loading, product]);

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
