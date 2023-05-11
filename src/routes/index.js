import React, { lazy } from "react";
import { HomeOutlined, PieChartOutlined } from "@ant-design/icons";

// 路由懒加载
export const Login = lazy(() => import(/* webpackChunkName: 'login' */ "../pages/login"));
export const Home = lazy(() => import(/* webpackChunkName: 'home' */ "../pages/Home"));
export const Wordcloud = lazy(() =>
  import(/* webpackChunkName: 'wordCloud' */ "../pages/charts/wordCloud")
);
export const ChinaMap = lazy(() =>
  import(/* webpackChunkName: 'chinaMap' */ "../pages/charts/chinaMap")
);
export const BarChartRanking = lazy(() =>
  import(
    /* webpackChunkName: 'barChartRanking' */ "../pages/charts/barChartRanking"
  )
);
// 菜单中显示的路由
export const routersMenu = [
  {
    key: "/home",
    icon: <HomeOutlined />,
    label: "首页",
    element: <Home />,
  },
  {
    key: "/charts",
    icon: <PieChartOutlined />,
    label: "charts",
    children: [
      {
        key: "/echarts_wordcloud",
        label: "Word Cloud",
        element: <Wordcloud />,
      },
      {
        key: "/china_map",
        label: "China Map",
        element: <ChinaMap />,
      },
      {
        key: "/bar_chart_ranking",
        label: "Bar Chart Ranking",
        element: <BarChartRanking />,
      },
    ],
  },
];
// 需要layout，但不在菜单中显示的路由， 如果需要选中某个菜单，一定要加activeMenuKeys
export const routersMenuHide = [
  {
    key: "/loginmenu",
    activeMenuKeys:["/charts", "/china_map", "/loginmenu"],
    label: "登录",
    element: <Login />,
  },
];
