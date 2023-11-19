import './ErrorPage.scss';

const ErrorPage = (): JSX.Element => {
  return (
    <div className="error-page">
      <div className="error-page__border">
        <h1 className="error-page__title">404</h1>
        <p className="error-page__text">This page does not exist!</p>
      </div>
    </div>
  );
};

export default ErrorPage;
