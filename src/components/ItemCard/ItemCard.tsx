import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ProductType } from '@/src/types/types';
import styles from './ItemCard.module.scss';
import { RootState } from '../../redux/store';

interface ItemCardProps {
  product: ProductType;
}

const ItemCard: React.FC<ItemCardProps> = ({ product }): JSX.Element => {
  const { page } = useSelector((state: RootState) => state.page);
  const router = useRouter();
  return (
    <button
      id={`${product.id}`}
      type="button"
      className={styles.card}
      data-testid="item"
      /* onClick={(): void =>
         router.push(`../frontpage=${page}&details=${product.id}`)
      } */
    >
      <Image
        className={styles.cardImg}
        width={200}
        height={200}
        src={product.images[0]}
        alt="item-img"
      />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{product.title}</h2>
        <p className={styles.cardPrice}>{product.price}$</p>
        <p className={styles.cardRating}>Rating: {product.rating}</p>
        <p className={styles.cardBrand}>Brand: {product.brand}</p>
        <p className={styles.cardText}>{product.description}</p>
      </div>
    </button>
  );
};

export default ItemCard;
