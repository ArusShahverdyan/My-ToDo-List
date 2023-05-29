import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loading',
  initialState: {
   isLoading: false,
  },
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;