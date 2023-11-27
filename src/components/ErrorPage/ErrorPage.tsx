import styles from './ErrorPage.module.scss';

const ErrorPage = (): JSX.Element => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.border}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.text}>This page does not exist!</p>
      </div>
    </div>
  );
};

export default ErrorPage;
