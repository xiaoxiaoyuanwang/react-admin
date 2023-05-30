// App.jsx
import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import "./app.css";
import { routersMenu, routersMenuHide, Login } from "./routes";
import { initRouterArr } from "./uitls";
import LayoutPage from "./components/layout";
function App() {
  const loading = useSelector((state) => state.loadingStore.loading);
  const routerList = initRouterArr([...routersMenu, ...routersMenuHide]);
  const token = localStorage.getItem("token");
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Suspense>
        <Routes fallback={<div>loading</div>}>
          <Route
            path="/login"
            exact
            element={token ? <Navigate to="/home" replace={true} /> : <Login />}
          />
          <Route
            path="/"
            exact
            element={<Navigate to="/home" replace={true} />}
          />
          <Route
            path="/"
            exact
            element={
              token ? <LayoutPage /> : <Navigate to="/login" replace={true} />
            }
          >
            {routerList.map((item, index) => {
              if (item.element) {
                return (
                  <Route
                    key={index}
                    path={item.key}
                    element={item.element}
                  ></Route>
                );
              } else {
                return null;
              }
            })}
          </Route>
        </Routes>
      </Suspense>
    </Spin>
  );
}
export default App;
