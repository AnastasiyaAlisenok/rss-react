import { Dispatch, SetStateAction, useState } from 'react';
import './Pagination.scss';

const firstPage = 1;

interface PaginationTypes {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  lastPage: number | null | undefined;
}

const Pagination: React.FC<PaginationTypes> = ({
  page,
  setPage,
  lastPage,
}): JSX.Element => {
  const clickPrev = (): void => {
    setPage(page - 1);
  };

  const clickNext = (): void => {
    setPage(page + 1);
  };

  const isDisableFirstPage = (): boolean => {
    if (page === firstPage) {
      return true;
    }
    return false;
  };

  const isDisableLastPage = (): boolean => {
    if (page === lastPage) {
      return true;
    }
    return false;
  };

  return (
    <div className="paginate">
      <button
        className="button paginate__btn"
        type="button"
        onClick={clickPrev}
        disabled={isDisableFirstPage()}
      >{`<`}</button>
      <div className="paginate__page">{page}</div>
      <button
        className="button paginate__btn"
        type="button"
        onClick={clickNext}
        disabled={isDisableLastPage()}
      >{`>`}</button>
    </div>
  );
};

export default Pagination;
