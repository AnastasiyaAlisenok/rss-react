import './App.css';
import getItems from './api/apiRequests';
import Search from './components/Search/Search';

const App = (): JSX.Element => {
  getItems().then((obj) => console.log(obj));
  return <Search />;
};

export default App;
