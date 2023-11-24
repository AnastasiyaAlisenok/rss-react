import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';
import { wrapper } from '../redux/store';
import api, { getPoducts } from '../api/api';
import Loader from '../components/Loader/Loader';
import ItemsList from '../components/ItemsList/ItemsList';
import Search from '../components/Search/Search';
import styles from './App.module.scss';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, query, limit } = context.query;

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
      },
    };
  }
);

const MainPage = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [error, setError] = useState(false);
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
    </div>
  );
};

export default MainPage;
