import { createSlice } from "@reduxjs/toolkit";

export const recommendSlice = createSlice({
  name: "recommend",
  initialState: {
    rank: [3, 4, 5],
  },
  reducers: {
    setRank: (state, action) => {
      console.log("setRank..............");
      console.log(action);
      state.rank = action.payload;
    },
  },
});

export const { setRank } = recommendSlice.actions;

export default recommendSlice.reducer;
