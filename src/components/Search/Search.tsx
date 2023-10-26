import React, { Component } from 'react';
import './Search.scss';
import searchIcon from '../../assets/search.svg';

interface SearchProps {
  value: string;
}

class Search extends Component<SearchProps> {
  public constructor(props: SearchProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { value } = this.props;
    return (
      <form className="search">
        <input className="search__input" type="text" value={value} />
        <button className="search__button" aria-label="Search" type="submit">
          <img className="search__icon" src={searchIcon} alt="search-icon" />
        </button>
      </form>
    );
  }
}

export default Search;
