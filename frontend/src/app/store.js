import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import guDongReducer from "../features/dong/guDongSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    guDong: guDongReducer,
  },
});
