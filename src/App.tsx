import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from './page/MainPage/MainPage';
import DetailBlock from './components/DetailBlock/DetailBlock';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />}>
        <Route path="frontpage=:page&details=:id" element={<DetailBlock />} />
      </Route>
      <Route path="/page=:pageNumber" element={<MainPage />} />
    </>
  )
);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
