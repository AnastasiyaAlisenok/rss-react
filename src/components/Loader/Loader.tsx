import React from 'react';
import styles from './Loader.module.scss';
import loader from '../../assets/loader.gif';

const Loader = (): JSX.Element => {
  return (
    <picture>
      <img className={styles.loader} width="80" src={loader.src} alt="loader" />
    </picture>
  );
};

export default Loader;
