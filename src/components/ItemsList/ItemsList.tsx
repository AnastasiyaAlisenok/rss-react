import React, { Dispatch, SetStateAction } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import { ProductType } from '../../types/types';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';
import Pagination from '../Pagination/Pagination';

interface ItemListType {
  content: ProductType[] | undefined;
  loading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  lastPage: number | null | undefined;
}

const ItemsList: React.FC<ItemListType> = ({
  content,
  loading,
  page,
  setPage,
  lastPage,
  setLimit,
}): JSX.Element => {
  return (
    <ErrorBoundary>
      <section>
        {loading ? (
          <Loader />
        ) : content?.length ? (
          <>
            <Pagination
              page={page}
              setPage={setPage}
              lastPage={lastPage}
              setLimit={setLimit}
            />
            <div className="list">
              {content.map((product) => (
                <ItemCard
                  key={product.id}
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
