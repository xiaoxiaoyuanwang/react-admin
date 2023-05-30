// layout-index.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Card } from "antd";
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
          <Card className={sty.content_wrapper}>
            <Outlet />
          </Card>
        </Content>
      </Layout>
      <Transform />
    </Layout>
  );
}
export default LayoutPage;
