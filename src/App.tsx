import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import HomePage from './page/HomePage';
import FormUncontrol from './components/Forms/FormUncontrol';
import FormHooks from './components/Forms/FormHooks';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/uncontrolled_form" element={<FormUncontrol />}></Route>
      <Route path="/react-hook-form" element={<FormHooks />}></Route>
    </>
  )
);

const App = (): React.ReactElement => {
  return <RouterProvider router={router} />;
};

export default App;
