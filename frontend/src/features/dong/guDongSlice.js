import { createSlice } from "@reduxjs/toolkit";

export const guDongSlice = createSlice({
  name: "guDong",
  initialState: {
    selectedGu: "전체",
    selectedDong: "전체",
  },
  reducers: {
    selectGu: (state, action) => {
      state.selectedGu = action.payload;
    },
    selectDong: (state, action) => {
      state.selectedDong = action.payload;
    },
  },
});

export const { selectGu, selectDong } = guDongSlice.actions;

export default guDongSlice.reducer;
