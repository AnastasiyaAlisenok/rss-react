import React, { useState, useCallback, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemsList from '../../components/ItemsList/ItemsList';
import Search from '../../components/Search/Search';
import filterNames from '../../api/apiRequests';
import { ContentContext } from '../../hoc/ContentProvider';
import { RootState } from '../../redux/store';

const MainPage = (): JSX.Element => {
  const { setNewProducts, setLoading, setNewLastPage } =
    useContext(ContentContext);
  const limit = useSelector((state: RootState) => state.limit);
  const [error, setError] = useState(false);

  const clickSearch = useCallback(
    (searchValue: string, pageNumber: number, limitValue: number): void => {
      if (!pageNumber) pageNumber = 1;
      filterNames(searchValue, pageNumber, limitValue)
        .then((resp) => {
          setNewProducts(resp.products);
          setLoading(false);
          const pageLast = Math.ceil(resp.total / limit);
          setNewLastPage(pageLast);
        })
        .catch((err: Error) => console.log(err.message));
    },
    [limit]
  );

  if (error) throw new Error();
  return (
    <div className="page">
      <div className="page__container">
        <div className="container">
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
        </div>
        <ItemsList />
      </div>
      <Outlet />
    </div>
  );
};

export default MainPage;
