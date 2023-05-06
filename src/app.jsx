// App.jsx
import React, { lazy, Suspense, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import {
  HomeOutlined,
  PieChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Spin } from "antd";
import classNames from "classnames";
import Transform from "./components/Transform";
import { useSelector } from "react-redux";
import sty from "./app.module.css";
import "./app.css";
const { Header, Content, Sider } = Layout;
// 路由懒加载
const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./pages/Home"));
const Wordcloud = lazy(() =>
  import(/* webpackChunkName: 'wordCloud' */ "./pages/charts/wordCloud")
);
const ChinaMap = lazy(() =>
  import(/* webpackChunkName: 'chinaMap' */ "./pages/charts/chinaMap")
);
const BarChartRanking = lazy(() =>
  import(
    /* webpackChunkName: 'barChartRanking' */ "./pages/charts/barChartRanking"
  )
);
const items = [
  {
    key: "/home",
    icon: <HomeOutlined />,
    label: "首页",
  },
  {
    key: "/charts",
    icon: <PieChartOutlined />,
    label: "charts",
    children: [
      {
        key: "/echarts_wordcloud",
        label: "Word Cloud",
      },
      {
        key: "/china_map",
        label: "China Map",
      },
      {
        key: "/bar_chart_ranking",
        label: "Bar Chart Ranking",
      },
    ],
  },
];
function App() {
  const menuNavigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const changeMenu = ({ key, keyPath }) => {
    menuNavigate(key);
  };
  const loading = useSelector((state) => state.loadingStore.loading);
  const titleSty = collapsed ? sty.title_s : sty.title_m;
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Layout className={sty.layout}>
        <Sider collapsed={collapsed}>
          <div className={classNames(titleSty, sty.title_n)}>小小愿望</div>
          <Menu
            theme="dark"
            onClick={changeMenu}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header className={sty.header}>
            <div
              onClick={() => setCollapsed(!collapsed)}
              className={sty.collapsed_btn}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </Header>
          <Content className={sty.content}>
            <div className={sty.content_wrapper}>
              <Suspense>
                <Routes fallback={<div>loading</div>}>
                  <Route
                    path="/"
                    element={<Navigate to="/home" replace={true} />}
                  />
                  <Route path="/home" element={<Home />}></Route>
                  <Route
                    path="/echarts_wordcloud"
                    element={<Wordcloud />}
                  ></Route>
                  <Route path="/china_map" element={<ChinaMap />}></Route>
                  <Route
                    path="/bar_chart_ranking"
                    element={<BarChartRanking />}
                  ></Route>
                </Routes>
              </Suspense>
            </div>
          </Content>
        </Layout>
        <Transform />
      </Layout>
    </Spin>
  );
}
export default App;
