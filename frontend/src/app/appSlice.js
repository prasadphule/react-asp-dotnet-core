import { combineReducers, createSlice } from '@reduxjs/toolkit'

export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState: {
    spinner: false,
  },
  reducers: {
    setSpinner: (state, action) => {
      return action.payload
    },
  },
});

export const { setSpinner } = spinnerSlice.actions;

export const SelectApp = state => state.app.spinner;

const appReducer = combineReducers({
  spinner: spinnerSlice.reducer,
})

export default appReducer;
