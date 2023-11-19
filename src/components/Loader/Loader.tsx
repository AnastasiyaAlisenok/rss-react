import React from 'react';
import './Loader.scss';
import loader from '../../assets/loader.gif';

const Loader = (): JSX.Element => {
  return <img className="loader" width="80px" src={loader} alt="loader" />;
};

export default Loader;
