import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'tasksCount',
  initialState: {
    tasksCount: 0,
  },
  reducers: {
    setTasksCount: (state, action) => {
      state.tasksCount = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTasksCount } = counterSlice.actions;

export default counterSlice.reducer;