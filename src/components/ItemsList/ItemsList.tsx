import React, { Component } from 'react';
import getItems from '../../api/apiRequests';
import ItemCard from '../ItemCard/ItemCard';
import { CharacterType } from '../../types/types';

interface ItemListType {
  value: string;
}

interface StateType {
  content: CharacterType[] | undefined;
  page: number;
}

class ItemsList extends Component<ItemListType> {
  state: Readonly<StateType> = {
    content: undefined,
    page: 2,
  };

  componentDidMount(): void {
    const { page } = this.state;
    getItems(page).then((obj) => {
      this.setState({ content: obj.results });
    });
  }

  render(): React.ReactNode {
    const { content } = this.state;
    return (
      <section className="list">
        {content &&
          content.map((character) => (
            <ItemCard
              key={character.id}
              src={character.image}
              name={character.name}
              status={character.status}
              planet={character.location.name}
              episode={character.species}
            />
          ))}
      </section>
    );
  }
}

export default ItemsList;
