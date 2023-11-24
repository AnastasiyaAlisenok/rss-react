import React from 'react';
import Image from 'next/image';
import styles from './Loader.module.scss';
import loader from '../../assets/loader.gif';

const Loader = (): JSX.Element => {
  return (
    <Image className={styles.loader} width="80" src={loader} alt="loader" />
  );
};

export default Loader;
