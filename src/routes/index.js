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
export const BarChartBaseLine = lazy(() =>
  import(
    /* webpackChunkName: 'barChartBaseLine' */ "../pages/charts/barChartBaseLine"
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
        key: "/charts/echartswordcloud",
        label: "Word Cloud",
        element: <Wordcloud />,
      },
      {
        key: "/charts/china_map",
        label: "China Map",
        element: <ChinaMap />,
      },
      {
        key: "/charts/bar_chart_ranking",
        label: "Bar Chart Ranking",
        element: <BarChartRanking />,
      },
      {
        key: "/charts/bar_chart_base_line",
        label: "Bar Chart Base Line",
        element: <BarChartBaseLine />,
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
