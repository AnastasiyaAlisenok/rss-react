import React from 'react';
import ItemsList from './components/ItemsList/ItemsList';
import Search from './components/Search/Search';
import { CharacterType } from './types/types';
import filterNames from './api/apiRequests';

interface StateType {
  content: CharacterType[] | undefined;
  loading: boolean;
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
  };

  clickSearch = (searchValue: string): void => {
    console.log(searchValue);
    filterNames(searchValue)
      .then((resp) => {
        this.setState({
          content: resp.results,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render(): React.ReactNode {
    const { content, loading } = this.state;
    return (
      <>
        <Search clickSearch={this.clickSearch} />
        <ItemsList content={content} loading={loading} />
      </>
    );
  }
}

export default App;
