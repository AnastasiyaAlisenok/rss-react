import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './HomePage.module.scss';
import { RootState } from '../redux/store';
import DataCard from '../components/DataCard/DataCard';

const HomePage = (): React.ReactElement => {
  const formData = useSelector((state: RootState) => state.formData);
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
      <div className={styles.card}>
        {formData.map((data, index): React.ReactNode => {
          return <DataCard key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
