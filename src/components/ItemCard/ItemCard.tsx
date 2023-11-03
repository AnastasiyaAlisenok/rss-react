import React from 'react';
import './ItemCard.scss';

interface ItemCardProps {
  id: number;
  src: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  clickCard: (id: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  src,
  title,
  description,
  price,
  rating,
  brand,
  clickCard,
}): JSX.Element => {
  return (
    <button
      id={`${id}`}
      type="button"
      className="list__card"
      onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
        const idCard = Number((event.currentTarget as HTMLButtonElement).id);
        clickCard(idCard);
      }}
    >
      <img className="list__card-img" src={src} alt="item-img" />
      <div className="list__card-content">
        <h2 className="list__card-title">{title}</h2>
        <p className="list__card-price">{price}$</p>
        <p className="list__card-rating">Rating: {rating}</p>
        <p className="list__card-brand">Brand: {brand}</p>
        <p className="list__card-text">{description}</p>
      </div>
    </button>
  );
};

export default ItemCard;
