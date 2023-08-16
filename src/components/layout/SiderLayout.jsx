/* eslint-disable react-hooks/exhaustive-deps */
// layout-index.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import sty from "./index.module.css";
import { collpsedActions } from "../../redux/actions/layout";
import { routersMenu } from "../../routes";
const { Sider } = Layout;
function SiderLayoutPage() {
  const collapsed = useSelector((state) => state.layoutStore.collapsed);
  const dispatch = useDispatch();
  const menuNavigate = useNavigate();
  const menuLoaction = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [menusList, setMenusList] = useState([]);
  useEffect(() => {
    const collapsedInfo = localStorage.getItem("collapsed");
    dispatch(collpsedActions(JSON.parse(collapsedInfo)));
    setMenusList(initMenus(routersMenu, []));
  }, []);
  useEffect(() => {
    searchUrlKey([...routersMenu]);
  }, [menuLoaction]);
  const initMenus = (menus, resMenus) => {
    menus.forEach((item, idx) => {
      if (item.children && item.children.length > 0) {
        resMenus[idx] = JSON.parse(JSON.stringify(item));
        resMenus[idx].children = [];
        delete resMenus[idx].element;
        delete resMenus[idx].icon;
        return initMenus(item.children, resMenus[idx].children);
      } else {
        let noChildren = JSON.parse(JSON.stringify(item));
        delete noChildren.children;
        delete noChildren.element;
        delete noChildren.icon;
        return (resMenus[idx] = noChildren);
      }
    });
    return resMenus;
  };
  const initOpenKeys = () => {
    let names = menuLoaction.pathname.split("/").filter(Boolean);
    let resKeys = [];
    for (let index = 0; index < names.length; index++) {
      const element = names[index];
      if (index === 0) {
        resKeys.push(`${element}`);
      } else {
        resKeys.push(`${resKeys[index - 1]}/${element}`);
      }
    }
    return resKeys;
  };
  const searchUrlKey = (menus) => {
    let resKeys = [];
    const searchFun = (list) => {
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element.key === menuLoaction.pathname) {
          resKeys = initOpenKeys();
          break;
        } else {
          if (element.children) {
            resKeys.push(element.key);
            searchFun(element.children);
          }
        }
      }
    };
    searchFun(menus);
    setSelectedKeys(resKeys);
  };
  const changeMenu = ({ key, keyPath }) => {
    menuNavigate(key);
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
        selectedKeys={[menuLoaction.pathname]}
        mode="inline"
        items={menusList}
      />
    </Sider>
  );
}
export default SiderLayoutPage;
