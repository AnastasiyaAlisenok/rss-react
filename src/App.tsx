import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import ItemsList from './components/ItemsList/ItemsList';
import Search from './components/Search/Search';
import { ProductType } from './types/types';
import filterNames from './api/apiRequests';

const App = (): JSX.Element => {
  const [content, setContent] = useState<ProductType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState<null | number>();

  const clickSearch = useCallback(
    (searchValue: string, pageNumber: number): void => {
      filterNames(searchValue, pageNumber)
        .then((resp) => {
          setContent(resp.products);
          setLoading(false);
          const pageLast = Math.ceil(resp.total / 8);
          setLastPage(pageLast);
        })
        .catch((err: Error) => console.log(err.message));
    },
    []
  );

  if (error) throw new Error();
  return (
    <>
      <div className="container">
        <Search clickSearch={clickSearch} page={page} setPage={setPage} />
        <button
          className="button"
          type="button"
          onClick={(): void => {
            setError(true);
          }}
        >
          Get error
        </button>
      </div>
      <ItemsList
        content={content}
        loading={loading}
        page={page}
        setPage={setPage}
        lastPage={lastPage}
      />
    </>
  );
};

export default App;
