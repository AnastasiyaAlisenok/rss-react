import { useContext } from 'react';
import './Pagination.scss';
import { ContentContext } from '../../hoc/ContentProvider';

const firstPage = 1;

const Pagination = (): JSX.Element => {
  const { page, setNewPage, setNewLimit, lastPage } =
    useContext(ContentContext);
  const clickPrev = (): void => {
    setNewPage(page - 1);
  };

  const clickNext = (): void => {
    setNewPage(page + 1);
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
      <select
        className="paginate__select"
        defaultValue="4"
        onChange={(event): void => setNewLimit(Number(event.target.value))}
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default Pagination;
