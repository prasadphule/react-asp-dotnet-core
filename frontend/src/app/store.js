import { configureStore } from '@reduxjs/toolkit';
import objectTypeReducer from 'features/objectType/objectTypeSlice';
import appReducer from 'app/appSlice';

export default configureStore({
  reducer: {
    objectType: objectTypeReducer,
    app: appReducer
  },
});
