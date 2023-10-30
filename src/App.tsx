import React from 'react';
import ItemsList from './components/ItemsList/ItemsList';
import Search from './components/Search/Search';
import { CharacterType } from './types/types';
import filterNames from './api/apiRequests';
import './App.scss';

interface StateType {
  content: CharacterType[] | undefined;
  loading: boolean;
  error: boolean;
}

interface AppType {}

class App extends React.Component<AppType> {
  constructor(props: AppType) {
    super(props);
    this.clickSearch = this.clickSearch.bind(this);
  }

  state: Readonly<StateType> = {
    content: undefined,
    loading: true,
    error: false,
  };

  clickSearch = (searchValue: string): void => {
    filterNames(searchValue)
      .then((resp) => {
        this.setState({
          content: resp.results,
          loading: false,
        });
      })
      .catch((err: Error) => console.log(err.message));
  };

  render(): React.ReactNode {
    const { content, loading, error } = this.state;
    if (error) throw new Error();
    return (
      <>
        <Search clickSearch={this.clickSearch} />
        <button
          className="button"
          type="button"
          onClick={(): void => {
            this.setState({ error: true });
          }}
        >
          Get error
        </button>
        <ItemsList content={content} loading={loading} />
      </>
    );
  }
}

export default App;
