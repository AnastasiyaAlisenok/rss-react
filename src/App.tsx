import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import HomePage from './page/HomePage';
import Form from './components/Form/Form';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />}></Route>
      <Route
        path="/uncontrolled_form"
        element={
          <Form title="Form - used uncontrolled components" type="uncontrol" />
        }
      ></Route>
      <Route
        path="/react-hook-form"
        element={<Form title="Form - used React Hook Form" type="hook-form" />}
      ></Route>
    </>
  )
);

const App = (): React.ReactElement => {
  return <RouterProvider router={router} />;
};

export default App;
