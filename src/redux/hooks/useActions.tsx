import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as searchActions } from '../searchValue/searchValue.slice';
import { actions as limitActions } from '../limit/limit.slice';
import { actions as pageActions } from '../page/page.slice';
import { actions as loadingPageActions } from '../isLoadingPage/isLoadingPage.slice';
import { actions as loadingDetailActions } from '../isLoadingDetail/isLoadingDetail.slice';

const rootActions = {
  ...searchActions,
  ...limitActions,
  ...pageActions,
  ...loadingPageActions,
  ...loadingDetailActions,
};

const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch);
  }, [dispatch]);
};

export default useActions;
