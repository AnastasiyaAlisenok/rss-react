import '../styles/global.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { store } from '../redux/store';
import ErrorPage from '../components/ErrorPage/ErrorPage';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
