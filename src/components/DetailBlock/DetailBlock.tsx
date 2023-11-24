import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './DetailBlock.module.scss';
import Loader from '../Loader/Loader';
import { useGetProductQuery } from '../../api/api';
import useActions from '../../redux/hooks/useActions';
import { RootState } from '../../redux/store';

const DetailBlock = (): JSX.Element => {
  const router = useRouter();
  const { page, id } = router.query;
  const { setLoadingDeatil } = useActions();
  const isLoading = useSelector((state: RootState) => state.isLoadingDetail);
  const { data, isFetching } = useGetProductQuery({
    id: Number(id),
    page: Number(page),
  });

  useEffect(() => {
    setLoadingDeatil(isFetching);
  }, [isFetching]);

  return (
    <div className={styles.detail}>
      {isLoading && !data ? (
        <Loader />
      ) : (
        <>
          <div className={styles.detailBlock} data-testid="detail">
            <button
              data-testid="btn-close"
              type="button"
              className={styles.closeBtn}
              onClick={(): void => router.back()}
            >
              Close
            </button>
            <Image
              className={styles.img}
              src={data?.images[0] as string}
              alt="item-img"
            />
            <div className={styles.content}>
              <h2 className={styles.title}>{data?.title}</h2>
              <p className={styles.price}>Price: {data?.price}$</p>
              <p className={styles.rating}>Rating: {data?.rating}</p>
              <p className={styles.brand}>Brand: {data?.brand}</p>
              <p className={styles.text}>{data?.description}</p>
            </div>
          </div>
          <button
            className={styles.overlay}
            type="button"
            onClick={(): void => router.back()}
          >{` `}</button>
        </>
      )}
    </div>
  );
};

export default DetailBlock;
