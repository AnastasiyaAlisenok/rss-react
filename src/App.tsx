import './App.css';
import ItemsList from './components/ItemsList/ItemsList';
import Search from './components/Search/Search';

const App = (): JSX.Element => {
  return (
    <>
      <Search value={localStorage.getItem('searchInfo') || ''} />
      <ItemsList value="" />
    </>
  );
};

export default App;
