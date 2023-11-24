import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './Search.module.scss';
import searchIcon from '../../assets/search.svg';
import { RootState } from '../../redux/store';
import useActions from '../../redux/hooks/useActions';

const firstPage = 1;

const Search = (): JSX.Element => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get('limit')) || 4;
  const { setNewPage } = useActions();
  const searchValue = useSelector((state: RootState) => state.searchValue);
  const [value, setValue] = useState(searchValue);
  const { saveSearchValue } = useActions();
  const router = useRouter();

  const changeValue = (newValue: string): void => {
    setValue(newValue);
  };

  const clickButton = (newValue: string): void => {
    setNewPage(firstPage);
    saveSearchValue(newValue);
    localStorage.setItem('search-value', newValue);
    const params = new URLSearchParams();
    params.set('page', firstPage.toString());
    params.set('query', newValue);
    params.set('limit', limit.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className={styles.search}>
      <input
        className={styles.input}
        type="text"
        value={value}
        data-testid="input"
        onChange={(event): void => {
          changeValue(event.target.value);
        }}
      />
      <button
        className={styles.searchBtn}
        aria-label="Search"
        type="submit"
        data-testid="input-btn"
        onClick={(e): void => {
          e.preventDefault();
          clickButton(value);
        }}
      >
        <Image className={styles.icon} src={searchIcon} alt="search-icon" />
      </button>
    </form>
  );
};

export default Search;
