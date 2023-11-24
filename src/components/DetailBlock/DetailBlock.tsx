import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ProductType } from '@/src/types/types';
import styles from './DetailBlock.module.scss';
import Loader from '../Loader/Loader';
import { useGetProductQuery } from '../../api/api';
import useActions from '../../redux/hooks/useActions';
import { RootState } from '../../redux/store';

const DetailBlock = (props: {
  product: ProductType | undefined;
}): JSX.Element => {
  const router = useRouter();
  const { product } = props;
  const { page, id } = router.query;
  const { setLoadingDeatil } = useActions();
  const isLoading = useSelector((state: RootState) => state.isLoadingDetail);
  /* const { data, isFetching } = useGetProductQuery({
    id: Number(id),
    page: Number(page),
  }); */

  /* useEffect(() => {
    setLoadingDeatil(isFetching);
  }, [isFetching]); */

  return (
    <div className={styles.detail}>
      {isLoading && !product ? (
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
              src={product?.images[0] as string}
              alt="item-img"
              width={300}
              height={300}
            />
            <div className={styles.content}>
              <h2 className={styles.title}>{product?.title}</h2>
              <p className={styles.price}>Price: {product?.price}$</p>
              <p className={styles.rating}>Rating: {product?.rating}</p>
              <p className={styles.brand}>Brand: {product?.brand}</p>
              <p className={styles.text}>{product?.description}</p>
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
