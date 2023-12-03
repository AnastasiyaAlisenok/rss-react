import { createSlice } from '@reduxjs/toolkit';

export interface FormState {
  name: string;
  age: number | null;
  email: string;
  password: string;
  gender: string;
  accept: boolean;
  image: string;
  country: string;
}
const initialState: FormState[] = [];

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { actions, reducer } = formSlice;

export const { setFormData } = formSlice.actions;
