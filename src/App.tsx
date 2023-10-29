import React from 'react';
import './App.css';
import ItemsList from './components/ItemsList/ItemsList';
import Search from './components/Search/Search';
import { CharacterType } from './types/types';
import { filterNames } from './api/apiRequests';

interface StateType {
  content: CharacterType[] | undefined;
  loading: boolean;
  value: string;
}

class App extends React.Component {
  state: Readonly<StateType> = {
    content: undefined,
    loading: true,
    value: (localStorage.getItem('search-value') as string) || '',
  };

  componentDidMount(): void {
    const { value } = this.state;
    console.log(value);
    filterNames(value)
      .then((resp) => {
        this.setState({ content: resp.results, loading: false });
        if (value.length !== 0 && resp.results.length > 0) {
          localStorage.setItem('search-value', value);
        }
      })
      .catch((err) => console.log(err));
  }

  clickSearch = (value: string): void => {
    filterNames(value)
      .then((resp) => {
        this.setState({ content: resp.results });
        if (resp.results.length > 0) {
          localStorage.setItem('search-value', value);
        }
      })
      .catch((err) => console.log(err));
  };

  saveValue = (searchValue: string): void => {
    this.setState({ value: searchValue });
  };

  render(): React.ReactNode {
    this.saveValue = this.saveValue.bind(this);
    const { content, loading } = this.state;
    return (
      <>
        <Search clickButton={this.clickSearch} />
        <ItemsList content={content} loading={loading} />
      </>
    );
  }
}

export default App;
