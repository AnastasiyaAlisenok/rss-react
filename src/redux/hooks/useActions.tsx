import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as searchActions } from '../searchValue/searchValue.slice';
import { actions as limitActions } from '../limit/limit.slice';
import { actions as pageActions } from '../page/page.slice';

const rootActions = {
  ...searchActions,
  ...limitActions,
  ...pageActions,
};

const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};

export default useActions;
