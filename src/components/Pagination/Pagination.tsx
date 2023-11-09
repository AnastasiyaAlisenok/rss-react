import { useContext } from 'react';
import './Pagination.scss';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ContentContext } from '../../hoc/ContentProvider';

const firstPage = 1;

const Pagination = (): JSX.Element => {
  const { page, setNewPage, setNewLimit, lastPage, limit } =
    useContext(ContentContext);
  const { pageNumber } = useParams();
  const navigation = useNavigate();
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
      <NavLink to={`../page=${page - 1}`}>
        <button
          className="button paginate__btn"
          type="button"
          onClick={clickPrev}
          disabled={isDisableFirstPage()}
        >{`<`}</button>
      </NavLink>
      <div className="paginate__page">{pageNumber || page}</div>
      <NavLink to={`../page=${page + 1}`}>
        <button
          className="button paginate__btn"
          type="button"
          onClick={clickNext}
          disabled={isDisableLastPage()}
        >{`>`}</button>
      </NavLink>
      <select
        className="paginate__select"
        value={limit}
        onChange={(event): void => {
          setNewLimit(Number(event.target.value));
          navigation('../page=1');
        }}
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
