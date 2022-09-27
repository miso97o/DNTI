import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    nickName: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setNickName: (state, action) => {
      state.nickName = action.payload;
    },
    logout: (state) => {
      state.email = null;
      state.nickName = null;
    },
  },
});

export const { setEmail, setNickName, logout } = userSlice.actions;

export default userSlice.reducer;
