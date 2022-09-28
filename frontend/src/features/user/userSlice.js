import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    nickname: null,
    birthYear: null,
    gu: null,
    dong: null,
    dnti: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.birthYear = action.payload.birthYear;
      state.gu = action.payload.gu;
      state.dong = action.payload.dong;
      state.dnti = action.payload.dnti;
    },
    resetUser: (state, action) => {
      state.userId = null;
      state.nickname = null;
      state.birthYear = null;
      state.gu = null;
      state.dong = null;
      state.dnti = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
