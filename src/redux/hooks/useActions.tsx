import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as searchActions } from '../searchValue/searchValue.slice';
import { actions } from '../limit/limit.slice';

const rootActions = {
  ...searchActions,
  ...actions,
};

const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};

export default useActions;
