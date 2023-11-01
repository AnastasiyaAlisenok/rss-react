import React, { Component } from 'react';
import './ItemCard.scss';

interface ItemCardProps {
  src: string;
  name: string;
  status: string;
  planet: string;
  episode: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  src,
  name,
  status,
  planet,
  episode,
}): JSX.Element => {
  return (
    <div className="list__card">
      <img className="list__card-img" src={src} alt="item-img" />
      <div className="list__card-content">
        <h2 className="list__card-title">{name}</h2>
        <p className="list__card-status">{status}</p>
        <p className="list__card-text">Species:</p>
        <p className="list__card-description">{episode}</p>
        <p className="list__card-text">Last known location:</p>
        <p className="list__card-description">{planet}</p>
      </div>
    </div>
  );
};

export default ItemCard;
