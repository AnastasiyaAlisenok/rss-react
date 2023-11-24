import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ItemCard from '../ItemCard/ItemCard';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import styles from '../ItemCard/ItemCard.module.scss';
import { RootState } from '../../redux/store';
import { ProductType, ResponseType } from '../../types/types';
import useActions from '../../redux/hooks/useActions';

const ItemsList = (props: { data: ResponseType | undefined }): JSX.Element => {
  const router = useRouter();
  const { pageNumber } = router.query;
  const { setNewPage, setLastPage, setLoadingPage } = useActions();
  const { page } = useSelector((state: RootState) => state.page);
  const limit = useSelector((state: RootState) => state.limit);
  const isLoading = useSelector((state: RootState) => state.isLoadingPage);
  const { data } = props;
  const searchValue = useSelector((state: RootState) => state.searchValue);

  useEffect(() => {
    setLoadingPage(false);
    if (data) {
      const pageLast = Math.ceil(data.total / limit);
      setLastPage(pageLast);
    }
    if (pageNumber) {
      setNewPage(Number(pageNumber));
    }
  }, [data, pageNumber, page, isLoading, limit, searchValue]);

  return (
    <section className={styles.listContainer}>
      {isLoading ? (
        <Loader data-testid="loader-1" />
      ) : data?.products?.length ? (
        <>
          <Pagination />
          <div className={styles.list}>
            {data.products &&
              data.products.map((product: ProductType) => (
                <ItemCard key={product.id} product={product} />
              ))}
          </div>
        </>
      ) : (
        <p className={styles.notFound}>Nothing found!</p>
      )}
    </section>
  );
};

export default ItemsList;
