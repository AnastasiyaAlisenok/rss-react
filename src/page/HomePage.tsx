import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

const HomePage = (): React.ReactElement => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Choose form</h1>
      <div className={styles.linkContainer}>
        <Link className={styles.link} to="uncontrolled_form">
          Form - used uncontrolled components
        </Link>
        <Link className={styles.link} to="react-hook-form">
          Form - used React-hook-form
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
