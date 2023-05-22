// App.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Space, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import sty from "./index.module.css";
import { collpsedActions } from "../../redux/actions/layout";
const { Header } = Layout;
function HeaderLayoutPage() {
  const collapsed = useSelector((state) => state.layoutStore.collapsed);
  const dispatch = useDispatch();
  const menuNavigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const info = JSON.parse(userInfo);
      setUserInfo(info);
    }
  }, []);
  useEffect(() => {
    const collapsedInfo = localStorage.getItem("collapsed");
    dispatch(collpsedActions(JSON.parse(collapsedInfo)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loginOut = (e) => {
    if (e.key === "loginOut") {
      localStorage.setItem("token", "");
      localStorage.setItem("menu", "");
      menuNavigate("/login");
    }
  };
  return (
    <Header className={sty.header}>
      <div
        onClick={() => {
          let coll = !collapsed;
          localStorage.setItem("collapsed", coll);
          dispatch(collpsedActions(coll));
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
  );
}
export default HeaderLayoutPage;
