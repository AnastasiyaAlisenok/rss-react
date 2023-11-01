import React, { Dispatch, SetStateAction, useState } from 'react';
import './Search.scss';
import searchIcon from '../../assets/search.svg';

interface SearchProps {
  clickSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ clickSearch }): JSX.Element => {
  const [value, setValue] = useState(
    localStorage.getItem('search-value') || ''
  );
  const changeValue = (searchValue: string): void => {
    setValue(searchValue);
  };

  const clickButton = (searchValue: string): void => {
    localStorage.setItem('search-value', searchValue);
    clickSearch(searchValue.trim());
  };

  return (
    <form className="search">
      <input
        className="search__input"
        type="text"
        value={value}
        onChange={(event): void => {
          changeValue(event.target.value);
        }}
      />
      <button
        className="search__button"
        aria-label="Search"
        type="submit"
        onClick={(): void => {
          clickButton(value);
        }}
      >
        <img className="search__icon" src={searchIcon} alt="search-icon" />
      </button>
    </form>
  );
};

export default Search;
