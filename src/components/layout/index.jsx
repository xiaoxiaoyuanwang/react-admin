// layout-index.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import sty from "./index.module.css";
import Transform from "../Transform";
import HeaderLayoutPage from "./HeaderLayout";
import SiderLayoutPage from "./SiderLayout";
const { Content } = Layout;
function LayoutPage() {
  return (
    <Layout className={sty.layout}>
      <SiderLayoutPage />
      <Layout>
        <HeaderLayoutPage />
        <Content className={sty.content}>
          <div className={sty.content_wrapper}>
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Transform />
    </Layout>
  );
}
export default LayoutPage;
