import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import HomePage from './page/HomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />}></Route>
    </>
  )
);

const App = (): React.ReactElement => {
  return <RouterProvider router={router} />;
};

export default App;
