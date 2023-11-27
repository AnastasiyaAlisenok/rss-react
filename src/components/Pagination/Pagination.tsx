import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import styles from './Pagination.module.scss';
import { RootState } from '../../redux/store';
import useActions from '../../redux/hooks/useActions';

const firstPage = 1;

const Pagination = (): JSX.Element => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams.get('page'));
  const frontpage = Number(searchParams.get('frontpage'));
  const { page, lastPage } = useSelector((state: RootState) => state.page);
  const limit = Number(searchParams.get('limit')) || 4;
  const searchValue = useSelector((state: RootState) => state.searchValue);
  const { setLimit, increment, decrement, setNewPage } = useActions();
  const router = useRouter();

  useEffect(() => {
    if (pageNumber > 0) {
      setNewPage(pageNumber);
    }
    if (frontpage) {
      setNewPage(frontpage);
    }
  }, [pageNumber, frontpage]);

  const createPageURL = (value: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', value.toString());
    params.set('query', searchValue);
    params.set('limit', limit.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const clickPrev = (): void => {
    decrement();
    createPageURL(page - 1);
  };

  const clickNext = (): void => {
    increment();
    createPageURL(page + 1);
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
    <div className={styles.paginate}>
      <button
        className={`button ${styles.btn}`}
        type="button"
        onClick={clickPrev}
        disabled={isDisableFirstPage()}
      >{`<`}</button>
      <div className={styles.page}>{page}</div>
      <button
        className={`button ${styles.btn}`}
        type="button"
        onClick={clickNext}
        disabled={isDisableLastPage()}
        data-testid="btn-next"
      >{`>`}</button>
      <select
        className={styles.select}
        value={limit}
        onChange={(event): void => {
          setLimit(Number(event.target.value));
          setNewPage(firstPage);
          const params = new URLSearchParams(searchParams);
          params.set('page', firstPage.toString());
          params.set('limit', event.target.value);
          router.push(`${pathname}?${params.toString()}`);
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
