import { ReactNode, createContext, useMemo, useState } from 'react';

type ContentProviderProps = {
  children: ReactNode;
};

interface ContentContextProps {
  page: number;
  setNewPage: (newPage: number) => void;
  lastPage: number | null | undefined;
  setNewLastPage: (newLastPage: number) => void;
}

export const ContentContext = createContext<ContentContextProps>({
  page: 1,
  setNewPage: () => {},
  lastPage: null,
  setNewLastPage: () => {},
});

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}) => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState<number>();

  const setNewPage = (newPage: number): void => {
    setPage(newPage);
  };

  const setNewLastPage = (newPage: number): void => {
    setLastPage(newPage);
  };

  const value = useMemo(() => {
    return {
      page,
      setNewPage,
      lastPage,
      setNewLastPage,
    };
  }, [page]);

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
