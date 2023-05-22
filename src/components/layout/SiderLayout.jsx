/* eslint-disable react-hooks/exhaustive-deps */
// layout-index.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import sty from "./index.module.css";
import { collpsedActions } from "../../redux/actions/layout";
import { routersMenu, routersMenuHide } from "../../routes";
const { Sider } = Layout;
function SiderLayoutPage() {
  const collapsed = useSelector((state) => state.layoutStore.collapsed);
  const dispatch = useDispatch();
  const menuNavigate = useNavigate();
  const menuLoaction = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    const collapsedInfo = localStorage.getItem("collapsed");
    dispatch(collpsedActions(JSON.parse(collapsedInfo)));
  }, []);
  useEffect(() => {
    searchUrlKey([...routersMenu, ...routersMenuHide]);
  }, [menuLoaction]);
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
    setSelectedKeys(resKeys);
  };
  const changeMenu = ({ key, keyPath }) => {
    menuNavigate(key);
    setSelectedKeys(keyPath);
  };
  const onOpenChange = (openKeys) => {
    setSelectedKeys(openKeys);
  };
  const titleSty = collapsed ? sty.title_s : sty.title_m;
  return (
    <Sider collapsed={collapsed}>
      <div className={classNames(titleSty, sty.title_n)}>小小愿望</div>
      <Menu
        theme="dark"
        onClick={changeMenu}
        onOpenChange={onOpenChange}
        openKeys={selectedKeys}
        selectedKeys={selectedKeys}
        mode="inline"
        items={routersMenu}
      />
    </Sider>
  );
}
export default SiderLayoutPage;
