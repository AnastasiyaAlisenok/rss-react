import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoudary';
import { ContentProvider } from './hoc/ContentProvider';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ContentProvider>
          <App />
        </ContentProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
