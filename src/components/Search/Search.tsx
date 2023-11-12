import React, { useContext, useEffect, useState } from 'react';
import './Search.scss';
import { useParams, useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/search.svg';
import { ContentContext } from '../../hoc/ContentProvider';

const firstPage = 1;

interface SearchProps {
  clickSearch: (value: string, page: number, limit: number) => void;
}

const Search: React.FC<SearchProps> = ({ clickSearch }): JSX.Element => {
  const {
    page,
    limit,
    setNewPage,
    setLoading,
    searchValue,
    setNewSearchValue,
  } = useContext(ContentContext);

  const { pageNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const searchvalue = localStorage.getItem('search-value') || '';
    clickSearch(searchValue.trim(), Number(pageNumber), limit);
    if (pageNumber) setNewPage(Number(pageNumber));
  }, [clickSearch, limit, page]);

  const changeValue = (newValue: string): void => {
    setNewSearchValue(newValue);
  };

  const clickButton = (newValue: string): void => {
    setNewPage(firstPage);
    setNewSearchValue(newValue);
    localStorage.setItem('search-value', newValue);
    clickSearch(newValue.trim(), firstPage, limit);
  };

  return (
    <form className="search">
      <input
        className="search__input"
        type="text"
        value={searchValue}
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
          clickButton(searchValue);
          navigate('../page=1');
        }}
      >
        <img className="search__icon" src={searchIcon} alt="search-icon" />
      </button>
    </form>
  );
};

export default Search;
