import React from 'react';
import './Loader.scss';
import loader from '../../assets/loader.gif';

class Loader extends React.Component {
  render(): React.ReactNode {
    return <img className="loader" width="80px" src={loader} alt="loader" />;
  }
}

export default Loader;
