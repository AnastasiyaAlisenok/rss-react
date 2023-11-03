import React, { useContext } from 'react';
import './DetailBlock.scss';
import { ContentContext } from '../../hoc/ContentProvider';

const DetailBlock = (): JSX.Element => {
  const { product } = useContext(ContentContext);
  return (
    <div className="detail">
      <img className="detail__img" src={product?.images[0]} alt="item-img" />
      <div className="detail__content">
        <h2 className="detail__title">{product?.title}</h2>
        <p className="detail__price">Price: {product?.price}$</p>
        <p className="detail__rating">Rating: {product?.rating}</p>
        <p className="detail__brand">Brand: {product?.brand}</p>
        <p className="detail__text">{product?.description}</p>
      </div>
    </div>
  );
};

export default DetailBlock;
