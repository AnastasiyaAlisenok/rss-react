import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as formReducer } from './Form.slice';

const reducers = combineReducers({
  formData: formReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
