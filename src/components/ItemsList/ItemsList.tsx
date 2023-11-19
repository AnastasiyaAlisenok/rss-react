import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import ItemCard from '../ItemCard/ItemCard';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';
import Pagination from '../Pagination/Pagination';
import { ProductType } from '../../types/types';
import useActions from '../../redux/hooks/useActions';
import { useGetPoductsQuery } from '../../api/api';

const ItemsList = (): JSX.Element => {
  const { pageNumber } = useParams();
  const { setNewPage, setLastPage, setLoadingPage } = useActions();
  const { page } = useSelector((state: RootState) => state.page);
  const limit = useSelector((state: RootState) => state.limit);
  const searchValue = useSelector((state: RootState) => state.searchValue);
  const isLoading = useSelector((state: RootState) => state.isLoadingPage);
  const { data, isFetching } = useGetPoductsQuery({
    value: searchValue,
    limit,
    page: pageNumber ? Number(pageNumber) : page,
  });

  useEffect(() => {
    setLoadingPage(isFetching);
    if (data) {
      const pageLast = Math.ceil(data.total / limit);
      setLastPage(pageLast);
    }
    if (pageNumber) {
      setNewPage(Number(pageNumber));
    }
  }, [data, pageNumber, page, isFetching]);

  return (
    <ErrorBoundary>
      <section className="list-container">
        {isLoading && !data?.products ? (
          <Loader data-testid="loader-1" />
        ) : data?.products?.length ? (
          <>
            <Pagination />
            <div className="list">
              {data.products &&
                data.products.map((product: ProductType) => (
                  <ItemCard
                    key={product.id}
                    id={product.id}
                    src={product.images[0]}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                    brand={product.brand}
                  />
                ))}
            </div>
          </>
        ) : (
          <p className="list__not-found">Nothing found!</p>
        )}
      </section>
    </ErrorBoundary>
  );
};

export default ItemsList;
