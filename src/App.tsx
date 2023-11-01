import React, { useState, useEffect } from 'react';
import ItemsList from './components/ItemsList/ItemsList';
import Search from './components/Search/Search';
import { CharacterType } from './types/types';
import filterNames from './api/apiRequests';
import './App.scss';

const App = (): JSX.Element => {
  const [content, setContent] = useState<CharacterType[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const clickSearch = (searchValue: string): void => {
    filterNames(searchValue)
      .then((resp) => {
        setContent(resp.results);
        setLoading(false);
      })
      .catch((err: Error) => console.log(err.message));
  };

  useEffect(() => {
    const value = localStorage.getItem('search-value') || '';
    // setValue(value);
    clickSearch(value.trim());
  });

  if (error) throw new Error();
  return (
    <>
      <Search clickSearch={clickSearch} />
      <button
        className="button"
        type="button"
        onClick={(): void => {
          setError(true);
        }}
      >
        Get error
      </button>
      <ItemsList content={content} loading={loading} />
    </>
  );
};

export default App;
