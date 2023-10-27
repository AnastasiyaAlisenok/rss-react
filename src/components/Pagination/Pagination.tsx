import React from 'react';

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
      <div>
        <button
          type="button"
          onClick={clickPrev}
          disabled={disablePrev}
        >{`<`}</button>
        <button type="button">{currentPage}</button>
        <button type="button" onClick={clickNext}>{`>`}</button>
      </div>
    );
  }
}

export default Pagination;
