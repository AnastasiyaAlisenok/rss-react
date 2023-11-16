import { useContext } from 'react';
import './Pagination.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ContentContext } from '../../hoc/ContentProvider';
import { RootState } from '../../redux/store';
import useActions from '../../redux/hooks/useActions';

const firstPage = 1;

const Pagination = (): JSX.Element => {
  const { page, setNewPage, lastPage } = useContext(ContentContext);
  const limit = useSelector((state: RootState) => state.limit);
  const { setLimit } = useActions();
  const { pageNumber } = useParams();
  const navigation = useNavigate();
  const clickPrev = (): void => {
    setNewPage(page - 1);
    navigation(`../page=${page - 1}`);
  };
  const isDisableFirstPage = (): boolean => {
    if (page === firstPage || Number(pageNumber) === firstPage) {
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
      <div className="paginate__page">{pageNumber || page}</div>
      <button
        className="button paginate__btn"
        type="button"
        onClick={(): void => {
          setNewPage(page + 1);
          navigation(`../page=${page + 1}`);
        }}
        disabled={isDisableLastPage()}
        data-testid="btn-next"
      >{`>`}</button>
      <select
        className="paginate__select"
        value={limit}
        onChange={(event): void => {
          setLimit(Number(event.target.value));
          setNewPage(firstPage);
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
