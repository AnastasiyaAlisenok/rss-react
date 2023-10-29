import React from 'react';
import './Pagination.scss';

interface PaginationType {
  currentPage: number;
  clickNext: () => void;
  clickPrev: () => void;
}

class Pagination extends React.Component<PaginationType> {
  isDisable = (): boolean => {
    const { currentPage } = this.props;
    if (currentPage === 1) {
      return true;
    }
    return false;
  };

  render(): React.ReactNode {
    const { currentPage, clickNext, clickPrev } = this.props;
    const disablePrev = this.isDisable();
    return (
      <div className="pagination">
        <button
          className="button button__prev"
          type="button"
          onClick={clickPrev}
          disabled={disablePrev}
        >{`<`}</button>
        <button className="button button__center" type="button">
          {currentPage}
        </button>
        <button
          className="button button__next"
          type="button"
          onClick={clickNext}
        >{`>`}</button>
      </div>
    );
  }
}

export default Pagination;
