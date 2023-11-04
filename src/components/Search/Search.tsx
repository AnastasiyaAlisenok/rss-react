import React, { useContext, useEffect, useState } from 'react';
import './Search.scss';
import { useParams } from 'react-router-dom';
import searchIcon from '../../assets/search.svg';
import { ContentContext } from '../../hoc/ContentProvider';

const firstPage = 1;

interface SearchProps {
  clickSearch: (value: string, page: number, limit: number) => void;
}

const Search: React.FC<SearchProps> = ({ clickSearch }): JSX.Element => {
  const { page, limit, setNewPage, setLoading } = useContext(ContentContext);
  const [value, setValue] = useState(
    localStorage.getItem('search-value') || ''
  );

  const { pageNumber } = useParams();

  useEffect(() => {
    setLoading(true);
    const searchvalue = localStorage.getItem('search-value') || '';
    clickSearch(searchvalue.trim(), Number(pageNumber), limit);
    if (pageNumber) setNewPage(Number(pageNumber));
  }, [clickSearch, limit, page]);

  const changeValue = (searchValue: string): void => {
    setValue(searchValue);
  };

  const clickButton = (searchValue: string): void => {
    setNewPage(firstPage);
    localStorage.setItem('search-value', searchValue);
    clickSearch(searchValue.trim(), firstPage, limit);
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
        onClick={(e): void => {
          e.preventDefault();
          clickButton(value);
        }}
      >
        <img className="search__icon" src={searchIcon} alt="search-icon" />
      </button>
    </form>
  );
};

export default Search;
