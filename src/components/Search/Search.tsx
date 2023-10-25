import './Search.scss';
import searchIcon from '../../assets/search.svg';

const Search = (): JSX.Element => {
  return (
    <form className="search">
      <input className="search__input" type="text" />
      <button className="search__button" aria-label="Search" type="submit">
        <img className="search__icon" src={searchIcon} alt="search-icon" />
      </button>
    </form>
  );
};

export default Search;
