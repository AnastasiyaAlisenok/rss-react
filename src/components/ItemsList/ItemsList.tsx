import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import ItemCard from '../ItemCard/ItemCard';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';
import Pagination from '../Pagination/Pagination';
import { ContentContext } from '../../hoc/ContentProvider';
import { useGetPoductsQuery } from '../../api/api';
import { ProductType } from '../../types/types';

const ItemsList = (): JSX.Element => {
  const { page, setNewPage } = useContext(ContentContext);
  const { pageNumber } = useParams();
  if (pageNumber) setNewPage(Number(pageNumber));
  const limit = useSelector((state: RootState) => state.limit);
  const searchValue = useSelector((state: RootState) => state.searchValue);
  const { data, isLoading } = useGetPoductsQuery({
    value: searchValue,
    limit,
    page,
  });
  console.log(data);
  return (
    <ErrorBoundary>
      <section className="list-container">
        {isLoading ? (
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
