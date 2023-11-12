import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../ItemCard/ItemCard';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';
import Pagination from '../Pagination/Pagination';
import { ContentContext } from '../../hoc/ContentProvider';

const ItemsList = (): JSX.Element => {
  const { products, loading, page } = useContext(ContentContext);
  return (
    <ErrorBoundary>
      <section className="list-container">
        {loading ? (
          <Loader data-testid="loader-1" />
        ) : products?.length ? (
          <>
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
