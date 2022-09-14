import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./3_pages/LandingPage";
import BoardMainPage from "./3_pages/BoardPage";
import DnRecommendPage from "./3_pages/DnRecommendPage";
import DntiResultPage from "./2_templates/dnti/DntiResultPage";
import DntiTestPage from "./2_templates/dnti/DntiTestPage";
import KmMapPage from "./3_pages/KmMapPage";
import MyPage from "./3_pages/MyPage";
import BoardMainComponent from "./2_templates/board/BoardMainComponent";
import PostViewComponent from "./2_templates/board/PostViewComponent";
import PostWriteComponent from "./2_templates/board/PostWriteComponent";
import ReviewViewComponent from "./2_templates/board/ReviewViewComponent";
import ReviewWriteComponent from "./2_templates/board/ReviewWriteComponent";
import DntiPage from "./3_pages/DntiPage";
import ErrorPage from "./3_pages/error-page";
import Navbar from "./2_templates/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/board",
    element: <BoardMainPage />,
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
    path: "/dnti",
    element: <DntiPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dnResult",
        element: <DntiResultPage />,
      },
      {
        path: "dnTest",
        element: <DntiTestPage />,
      },
    ],
  },
  {
    path: "/dnRecommend",
    element: <DnRecommendPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/kmMap",
    element: <KmMapPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/myPage",
    element: <MyPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);
