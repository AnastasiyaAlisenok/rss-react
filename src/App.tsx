import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from './page/MainPage/MainPage';
import DetailBlock from './components/DetailBlock/DetailBlock';
import ErrorPage from './components/ErrorPage/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />}>
        <Route path="frontpage=:page&details=:id" element={<DetailBlock />} />
      </Route>
      <Route path="/page=:pageNumber" element={<MainPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </>
  )
);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
