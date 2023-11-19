import React, { useState } from 'react';
import './Search.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import searchIcon from '../../assets/search.svg';
import { RootState } from '../../redux/store';
import useActions from '../../redux/hooks/useActions';

const firstPage = 1;

const Search = (): JSX.Element => {
  const { setNewPage } = useActions();
  const searchValue = useSelector((state: RootState) => state.searchValue);
  const [value, setValue] = useState(searchValue);
  const { saveSearchValue } = useActions();

  const navigate = useNavigate();

  const changeValue = (newValue: string): void => {
    setValue(newValue);
  };

  const clickButton = (newValue: string): void => {
    setNewPage(firstPage);
    saveSearchValue(newValue);
    localStorage.setItem('search-value', newValue);
  };

  return (
    <form className="search">
      <input
        className="search__input"
        type="text"
        value={value}
        data-testid="input"
        onChange={(event): void => {
          changeValue(event.target.value);
        }}
      />
      <button
        className="search__button"
        aria-label="Search"
        type="submit"
        data-testid="input-btn"
        onClick={(e): void => {
          e.preventDefault();
          clickButton(value);
          navigate('../page=1');
        }}
      >
        <img className="search__icon" src={searchIcon} alt="search-icon" />
      </button>
    </form>
  );
};

export default Search;
