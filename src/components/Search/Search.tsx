import React, { useContext, useEffect, useState } from 'react';
import './Search.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import searchIcon from '../../assets/search.svg';
import { ContentContext } from '../../hoc/ContentProvider';
import { RootState } from '../../redux/store';
import { actions } from '../../redux/searchValue/searchValue.slice';

const firstPage = 1;

interface SearchProps {
  clickSearch: (value: string, page: number, limit: number) => void;
}

const Search: React.FC<SearchProps> = ({ clickSearch }): JSX.Element => {
  const { page, limit, setNewPage, setLoading } = useContext(ContentContext);
  const searchValue = useSelector((state: RootState) => state.searchValue);
  const [value, setValue] = useState(searchValue);
  const dispatch = useDispatch();

  const { pageNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    clickSearch(searchValue.trim(), Number(pageNumber), limit);
    if (pageNumber) setNewPage(Number(pageNumber));
  }, [limit, page]);

  const changeValue = (newValue: string): void => {
    setValue(newValue);
  };

  const clickButton = (newValue: string): void => {
    setNewPage(firstPage);
    dispatch(actions.saveSearchValue(newValue));
    localStorage.setItem('search-value', newValue);
    clickSearch(newValue.trim(), firstPage, limit);
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
