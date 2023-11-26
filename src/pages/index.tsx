import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState, wrapper } from '../redux/store';
import api, { getPoducts, getProduct } from '../api/api';
import Loader from '../components/Loader/Loader';
import ItemsList from '../components/ItemsList/ItemsList';
import Search from '../components/Search/Search';
import styles from './App.module.scss';
import DetailBlock from '../components/DetailBlock/DetailBlock';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, query, limit, frontpage, details } = context.query;

    let productInfo;

    if (details) {
      productInfo = await store.dispatch(
        getProduct.initiate({
          page: Number(frontpage),
          id: Number(details),
        })
      );
    } else {
      productInfo = null;
    }

    const data = await store.dispatch(
      getPoducts.initiate({
        limit: Number(limit) ? Number(limit) : store.getState().limit,
        page: Number(page)
          ? Number(page)
          : frontpage
            ? Number(frontpage)
            : store.getState().page.page,
        value: query ? (query as string) : store.getState().searchValue,
      })
    );
    await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

    return {
      props: {
        products: data.data,
        product: productInfo,
      },
    };
  }
);

const MainPage = ({
  products,
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const searchParams = useSearchParams();
  const details = searchParams.get('details');
  const [hasError, setHasError] = useState(false);

  const setError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('This is example Error');
  }

  if (!products) {
    return <Loader />;
  }

  return (
    !hasError && (
      <div className={styles.page}>
        <div className={styles.pageContainer}>
          <div className={styles.container}>
            <Search />
            <button className={styles.button} type="button" onClick={setError}>
              Get error
            </button>
          </div>
          <ItemsList data={products} />
        </div>
        {details && (
          <Suspense fallback={<Loader />}>
            <DetailBlock product={product?.data} />
          </Suspense>
        )}
      </div>
    )
  );
};

export default MainPage;
