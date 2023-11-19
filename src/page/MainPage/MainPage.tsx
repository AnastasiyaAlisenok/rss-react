import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ItemsList from '../../components/ItemsList/ItemsList';
import Search from '../../components/Search/Search';

const MainPage = (): JSX.Element => {
  const [error, setError] = useState(false);
  if (error) throw new Error();
  return (
    <div className="page">
      <div className="page__container">
        <div className="container">
          <Search />
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
        <ItemsList />
      </div>
      <Outlet />
    </div>
  );
};

export default MainPage;
