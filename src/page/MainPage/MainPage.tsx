import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ItemsList from '../../components/ItemsList/ItemsList';
import Search from '../../components/Search/Search';

const MainPage = (): JSX.Element => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) throw new Error();
  }, [error]);

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
              navigate('../*');
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
