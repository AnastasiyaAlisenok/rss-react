import React, { Component } from 'react';
import './ItemCard.scss';

interface ItemCardProps {
  src: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  src,
  title,
  description,
  price,
  rating,
  brand,
}): JSX.Element => {
  return (
    <div className="list__card">
      <img className="list__card-img" src={src} alt="item-img" />
      <div className="list__card-content">
        <h2 className="list__card-title">{title}</h2>
        <p className="list__card-price">{price}$</p>
        <p className="list__card-rating">Rating: {rating}</p>
        <p className="list__card-brand">Brand: {brand}</p>
        <p className="list__card-text">{description}</p>
      </div>
    </div>
  );
};

export default ItemCard;
