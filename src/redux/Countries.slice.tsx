import { createSlice } from '@reduxjs/toolkit';
import { countriesOptions } from '../components/Select/options';

interface CountryState {
  label: string;
  value: string;
}
const initialState: CountryState[] = countriesOptions;

const countriesSlice = createSlice({
  name: 'countriesOptions',
  initialState,
  reducers: {
    filtrCountries: (state, action) => {
      return [...[...state]].filter((el) =>
        el.label.toLowerCase().includes(action.payload)
      );
    },
    setCountries: () => initialState,
  },
});

export const { actions, reducer } = countriesSlice;

export const { filtrCountries, setCountries } = countriesSlice.actions;
