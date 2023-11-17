import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import ItemCard from '../ItemCard/ItemCard';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';
import Pagination from '../Pagination/Pagination';
import useActions from '../../redux/hooks/useActions';
import { useGetPoductsQuery } from '../../api/api';
import { ProductType } from '../../types/types';

const ItemsList = (): JSX.Element => {
  const { pageNumber } = useParams();
  const { setNewPage, setLastPage } = useActions();
  const { page } = useSelector((state: RootState) => state.page);
  const limit = useSelector((state: RootState) => state.limit);
  const searchValue = useSelector((state: RootState) => state.searchValue);
  const { data, isFetching } = useGetPoductsQuery({
    value: searchValue,
    limit,
    page: pageNumber ? Number(pageNumber) : page,
  });

  useEffect(() => {
    if (data) {
      const pageLast = Math.ceil(data.total / limit);
      setLastPage(pageLast);
    }
    if (pageNumber) {
      setNewPage(Number(pageNumber));
    }
  }, [data, pageNumber, page]);

  return (
    <ErrorBoundary>
      <section className="list-container">
        {isFetching && !data?.products ? (
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
