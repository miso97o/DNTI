import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./3_pages/LandingPage";
import BoardPage from "./3_pages/BoardPage";
import DnRecommendPage from "./3_pages/DnRecommendPage";
import DntiMainComponent from "./2_templates/dnti/DntiMainComponent";
import DntiResultComponent from "./2_templates/dnti/DntiResultComponent";
import DntiTestComponent from "./2_templates/dnti/DntiTestComponent";
import KmMapPage from "./3_pages/KmMapPage";
import MyPage from "./3_pages/MyPage";
import BoardMainComponent from "./2_templates/board/BoardMainComponent";
import PostViewComponent from "./2_templates/board/PostViewComponent";
import PostWriteComponent from "./2_templates/board/PostWriteComponent";
import ReviewViewComponent from "./2_templates/board/ReviewViewComponent";
import ReviewWriteComponent from "./2_templates/board/ReviewWriteComponent";
import DntiPage from "./3_pages/DntiPage";
import ErrorPage from "./3_pages/ErrorPage";
import Root from "./3_pages/Root";
import LoginPage from "./3_pages/LoginPage";
import SignUpPage from "./3_pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "board",
        element: <BoardPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <BoardMainComponent />,
          },

          {
            path: "postview",
            element: <PostViewComponent />,
          },
          {
            path: "postwrite",
            element: <PostWriteComponent />,
          },
          {
            path: "reviewview",
            element: <ReviewViewComponent />,
          },
          {
            path: "reviewwrite",
            element: <ReviewWriteComponent />,
          },
        ],
      },
      {
        path: "dnti",
        element: <DntiPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <DntiMainComponent />,
          },
          {
            path: "test",
            element: <DntiTestComponent />,
          },
          {
            path: "result",
            element: <DntiResultComponent />,
          },
        ],
      },
      {
        path: "dnRecommend",
        element: <DnRecommendPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "kmMap",
        element: <KmMapPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "myPage",
        element: <MyPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
