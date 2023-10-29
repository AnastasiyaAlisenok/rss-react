import React, { Component } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import { CharacterType } from '../../types/types';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';

interface ItemListType {
  content: CharacterType[] | undefined;
  loading: boolean;
}

class ItemsList extends Component<ItemListType> {
  render(): React.ReactNode {
    const { content, loading } = this.props;
    return (
      <ErrorBoundary>
        <section className="list">
          {loading ? (
            <Loader />
          ) : (
            content &&
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
          )}
        </section>
      </ErrorBoundary>
    );
  }
}

export default ItemsList;
