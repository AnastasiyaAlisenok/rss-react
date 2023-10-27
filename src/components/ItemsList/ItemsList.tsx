import React, { Component } from 'react';
import getItems from '../../api/apiRequests';
import ItemCard from '../ItemCard/ItemCard';
import { CharacterType } from '../../types/types';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

interface ItemListType {
  value: string;
}

interface StateType {
  content: CharacterType[] | undefined;
  page: number;
  loading: boolean;
}

class ItemsList extends Component<ItemListType> {
  state: Readonly<StateType> = {
    content: undefined,
    page: 1,
    loading: true,
  };

  componentDidMount(): void {
    const { page } = this.state;
    getItems(page).then((obj) => {
      this.setState({ content: obj.results, loading: false });
    });
  }

  componentDidUpdate(): void {
    const { page } = this.state;
    getItems(page).then((obj) => {
      this.setState({ content: obj.results, loading: false });
    });
  }

  clickNext = (): void => {
    const { page } = this.state;
    this.setState({ loading: true });
    this.setState({ page: page + 1 });
  };

  clickPrev = (): void => {
    const { page } = this.state;
    this.setState({ loading: true });
    this.setState({ page: page - 1 });
  };

  render(): React.ReactNode {
    const { content, page, loading } = this.state;
    return (
      <>
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
        <Pagination
          currentPage={page}
          clickNext={this.clickNext}
          clickPrev={this.clickPrev}
        />
      </>
    );
  }
}

export default ItemsList;
