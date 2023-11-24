import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { wrapper } from '../redux/store';
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
        page: Number(page) ? Number(page) : 1,
        value: query ? (query as string) : store.getState().searchValue,
      })
    );
    await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

    return {
      props: {
        products: data,
        product: productInfo,
      },
    };
  }
);

const MainPage = ({
  products,
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const details = searchParams.get('details');
  const router = useRouter();

  useEffect(() => {
    if (error) throw new Error();
  }, [error]);

  if (!products) {
    return <Loader />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <Search />
          <button
            className={styles.button}
            type="button"
            onClick={(): void => {
              setError(true);
              router.push('../*');
            }}
          >
            Get error
          </button>
        </div>
        <ItemsList data={products.data} />
      </div>
      {details && <DetailBlock product={product?.data} />}
    </div>
  );
};

export default MainPage;
