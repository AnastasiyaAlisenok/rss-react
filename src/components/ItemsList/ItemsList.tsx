import React, { Component } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import { CharacterType } from '../../types/types';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';

interface ItemListType {
  content: CharacterType[] | undefined;
  loading: boolean;
}

const ItemsList: React.FC<ItemListType> = ({
  content,
  loading,
}): JSX.Element => {
  return (
    <ErrorBoundary>
      <section className="list">
        {loading ? (
          <Loader />
        ) : content?.length ? (
          content.map((character) => (
            <ItemCard
              key={character.id}
              src={character.image}
              name={character.name}
              status={character.status}
              planet={character.location.name}
              episode={character.species}
            />
          ))
        ) : (
          <p className="list__not-found">Nothing found!</p>
        )}
      </section>
    </ErrorBoundary>
  );
};

export default ItemsList;
