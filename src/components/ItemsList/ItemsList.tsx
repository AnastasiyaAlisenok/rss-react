import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import ItemCard from '../ItemCard/ItemCard';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';
import Pagination from '../Pagination/Pagination';
import { getDetailInfo } from '../../api/apiRequests';
import { ContentContext } from '../../hoc/ContentProvider';

const ItemsList = (): JSX.Element => {
  const { products, setNewProduct, loading } = useContext(ContentContext);
  const clickCard = (id: number): void => {
    getDetailInfo(id).then((obj) => {
      setNewProduct(obj);
    });
  };
  return (
    <ErrorBoundary>
      <section>
        {loading ? (
          <Loader />
        ) : products?.length ? (
          <div className="">
            <Pagination />
            <div className="list">
              {products &&
                products.map((product) => (
                  <ItemCard
                    key={product.id}
                    id={product.id}
                    src={product.images[0]}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                    brand={product.brand}
                    clickCard={clickCard}
                  />
                ))}
            </div>
          </div>
        ) : (
          <p className="list__not-found">Nothing found!</p>
        )}
      </section>
    </ErrorBoundary>
  );
};

export default ItemsList;
