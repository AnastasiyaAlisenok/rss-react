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
  loadingDetail: boolean;
  setLoadingDetail: (value: boolean) => void;
  product: ProductType | undefined;
  setNewProduct: (newProduct: ProductType) => void;
  searchValue: string;
  setNewSearchValue: (newValue: string) => void;
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
  loadingDetail: true,
  setLoadingDetail: () => {},
  product: undefined,
  setNewProduct: () => {},
  searchValue: localStorage.getItem('search-value') || '',
  setNewSearchValue: () => {},
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
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('search-value') || ''
  );
  const [loadingDetail, setLoadingDetailPage] = useState(true);

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

  const setNewSearchValue = (newValue: string): void => {
    setSearchValue(newValue);
  };

  const setLoadingDetail = (newValue: boolean): void => {
    setLoadingDetailPage(newValue);
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
      searchValue,
      setNewSearchValue,
      loadingDetail,
      setLoadingDetail,
    };
  }, [page, limit, products, loading, product, searchValue, loadingDetail]);

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
