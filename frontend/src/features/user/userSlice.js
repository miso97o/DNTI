import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: null,
  nickName: null,
  birthYear: null,
  gu: null,
  dong: null,
  dnti: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("state action ---------------------");
      console.log(action);
      console.log(state);

      return {
        ...state,
        userId: action.payload.userId,
        nickName: action.payload.nickName,
        birthYear: action.payload.birthYear,
        gu: action.payload.gu,
        dong: action.payload.dong,
        dnti: action.payload.dnti,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
