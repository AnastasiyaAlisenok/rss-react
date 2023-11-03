import React, { useState, useCallback, useContext } from 'react';
import ItemsList from '../../components/ItemsList/ItemsList';
import Search from '../../components/Search/Search';
import filterNames from '../../api/apiRequests';
import { ContentContext } from '../../hoc/ContentProvider';

const MainPage = (): JSX.Element => {
  const { setNewProducts, limit, setLoading, setNewLastPage } =
    useContext(ContentContext);
  const [error, setError] = useState(false);

  const clickSearch = useCallback(
    (searchValue: string, pageNumber: number, limitValue: number): void => {
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
    <>
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
    </>
  );
};

export default MainPage;
