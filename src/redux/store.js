import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter';
import loaderReducer from './loading';

export default  configureStore({
  reducer:{
    tasksCount:counterReducer,
    loader:loaderReducer,
  },
})