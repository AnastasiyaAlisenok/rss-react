import React, { Component, Dispatch, SetStateAction } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import { CharacterType } from '../../types/types';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoudary';
import Pagination from '../Pagination/Pagination';

interface ItemListType {
  content: CharacterType[] | undefined;
  loading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  lastPage: number | null | undefined;
}

const ItemsList: React.FC<ItemListType> = ({
  content,
  loading,
  page,
  setPage,
  lastPage,
}): JSX.Element => {
  return (
    <ErrorBoundary>
      <section>
        {loading ? (
          <Loader />
        ) : content?.length ? (
          <>
            <Pagination page={page} setPage={setPage} lastPage={lastPage} />
            <div className="list">
              {content.map((character) => (
                <ItemCard
                  key={character.id}
                  src={character.image}
                  name={character.name}
                  status={character.status}
                  planet={character.location.name}
                  episode={character.species}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="list__not-found">Nothing found!</p>
        )}
      </section>
    </ErrorBoundary>
  );
};

export default ItemsList;
