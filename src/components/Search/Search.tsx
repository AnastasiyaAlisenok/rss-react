import React, { Component } from 'react';
import './Search.scss';
import searchIcon from '../../assets/search.svg';

interface SearchProps {
  clickButton: (value: string) => void;
}

interface StateType {
  value: string;
}

class Search extends Component<SearchProps> {
  public constructor(props: SearchProps) {
    super(props);
  }

  state: Readonly<StateType> = {
    value: localStorage.getItem('search-value') || '',
  };

  render(): React.ReactNode {
    const { clickButton } = this.props;
    const { value } = this.state;
    return (
      <form className="search">
        <input
          className="search__input"
          type="text"
          value={value}
          onChange={(event): void => {
            this.setState({ value: event.target.value });
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
  }
}

export default Search;
