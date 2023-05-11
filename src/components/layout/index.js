// App.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, Avatar } from "antd";
import classNames from "classnames";
import sty from "./index.module.css";
import Transform from "../../components/Transform";
import { routersMenu, routersMenuHide } from "../../routes";
const { Header, Content, Sider } = Layout;
function LayoutPage() {
  const menuNavigate = useNavigate();
  const menuLoaction = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const collapsedInfo = localStorage.getItem("collapsed");
    setCollapsed(JSON.parse(collapsedInfo));
    if (userInfo) {
      const info = JSON.parse(userInfo);
      setUserInfo(info);
    }
  }, []);
  const searchUrlKey = (menus) => {
    let resKeys = [];
    const searchFun = (list) => {
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element.activeMenuKeys) {
          if (element.activeMenuKeys.indexOf(menuLoaction.pathname) !== -1) {
            resKeys = element.activeMenuKeys;
            break;
          }
        }
        if (element.children) {
          resKeys.push(element.key);
          searchFun(element.children);
        } else {
          if (element.key === menuLoaction.pathname) {
            resKeys.push(element.key);
            break;
          }
        }
      }
    };
    searchFun(menus);
    return resKeys;
  };
  const activeKeys = searchUrlKey([...routersMenu, ...routersMenuHide]);
  const loginOut = (e) => {
    if (e.key === "loginOut") {
      menuNavigate("/login");
    }
  };
  const changeMenu = ({ key, keyPath }) => {
    menuNavigate(key);
  };
  const titleSty = collapsed ? sty.title_s : sty.title_m;
  return (
    <Layout className={sty.layout}>
      <Sider collapsed={collapsed}>
        <div className={classNames(titleSty, sty.title_n)}>小小愿望</div>
        <Menu
          theme="dark"
          onClick={changeMenu}
          defaultOpenKeys={activeKeys}
          defaultSelectedKeys={activeKeys}
          mode="inline"
          items={routersMenu}
        />
      </Sider>
      <Layout>
        <Header className={sty.header}>
          <div
            onClick={() => {
              let coll = !collapsed
              localStorage.setItem("collapsed", coll);
              setCollapsed(coll);
            }}
            className={sty.collapsed_btn}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div>
            <Avatar className={sty.avatar} icon={<UserOutlined />} />
            <Dropdown
              menu={{
                items: [
                  {
                    key: "loginOut",
                    label: "退出登录",
                  },
                ],
                onClick: loginOut,
              }}
            >
              <Space className={sty.out_btn}>
                {userInfo.username}
                <DownOutlined />
              </Space>
            </Dropdown>
          </div>
        </Header>
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
