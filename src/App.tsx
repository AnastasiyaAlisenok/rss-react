import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import ItemsList from './components/ItemsList/ItemsList';
import Search from './components/Search/Search';
import { CharacterType } from './types/types';
import filterNames from './api/apiRequests';

const App = (): JSX.Element => {
  const [content, setContent] = useState<CharacterType[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState<null | number>();

  const clickSearch = useCallback(
    (searchValue: string, pageNumber: number): void => {
      filterNames(searchValue, pageNumber)
        .then((resp) => {
          setContent(resp.results);
          setLoading(false);
          setLastPage(resp.info.pages);
        })
        .catch((err: Error) => console.log(err.message));
    },
    []
  );

  if (error) throw new Error();
  return (
    <>
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
