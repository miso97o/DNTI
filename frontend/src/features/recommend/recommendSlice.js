import { createSlice } from "@reduxjs/toolkit";

export const recommendSlice = createSlice({
  name: "recommend",
  initialState: {
    rank: [],
  },
  reducers: {
    setRanks: (state, action) => {
      state.rank = action.payload;
    },
  },
});

export const { setRanks } = recommendSlice.actions;

export default recommendSlice.reducer;
