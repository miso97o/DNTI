import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import guDongReducer from "../features/dong/guDongSlice";
import recommendReducer from "../features/recommend/recommendSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    guDong: guDongReducer,
    recommend: recommendReducer,
  },
});

/**
 * 사용법
 *
 * - 저장된 데이터 가져오기
 *
 *    사용하고자 하는 컴포넌트에서
 *      import { useSelector } from "react-redux";
 *
 *      const recommend = useSelector((state) => state.recommend);
 *      console.log(recommend.rank)
 *
 *
 *
 * - 데이터 저장하기
 *
 *    import { useDispatch } from "react-redux";
 *    import { setRank } from "../features/recommend/recommendSlice";
 *
 *    const dispatch = useDispatch();
 *    dispatch(setRank(data));
 */
