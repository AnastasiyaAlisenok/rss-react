import React, { Component } from 'react';
import './Search.scss';
import searchIcon from '../../assets/search.svg';

interface SearchProps {
  clickSearch: (value: string) => void;
}

interface StateType {
  value: string;
}

class Search extends Component<SearchProps> {
  public constructor(props: SearchProps) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  state: Readonly<StateType> = {
    value: localStorage.getItem('search-value') || '',
  };

  componentDidMount(): void {
    const { clickSearch } = this.props;
    const searchvalue = localStorage.getItem('search-value') || '';
    this.setState({
      value: searchvalue,
    });
    clickSearch(searchvalue.trim());
  }

  clickButton = (): void => {
    const { clickSearch } = this.props;
    const { value } = this.state;
    localStorage.setItem('search-value', value);
    clickSearch(value);
  };

  changeValue = (searchValue: string): void => {
    console.log(searchValue);
    this.setState({ value: searchValue });
  };

  render(): React.ReactNode {
    const { value } = this.state;
    return (
      <form className="search">
        <input
          className="search__input"
          type="text"
          value={value}
          onChange={(event): void => {
            this.changeValue(event.target.value);
          }}
        />
        <button
          className="search__button"
          aria-label="Search"
          type="submit"
          onClick={(): void => {
            console.log(value);
            this.clickButton();
          }}
        >
          <img className="search__icon" src={searchIcon} alt="search-icon" />
        </button>
      </form>
    );
  }
}

export default Search;
