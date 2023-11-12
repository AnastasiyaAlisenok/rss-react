import React, { useContext } from 'react';
import './ItemCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ContentContext } from '../../hoc/ContentProvider';

interface ItemCardProps {
  id: number;
  src: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  src,
  title,
  description,
  price,
  rating,
  brand,
}): JSX.Element => {
  const { page } = useContext(ContentContext);
  const navigation = useNavigate();
  return (
    <button
      id={`${id}`}
      type="button"
      className="list__card"
      data-testid="item"
      onClick={(): void => navigation(`../frontpage=${page}&details=${id}`)}
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
