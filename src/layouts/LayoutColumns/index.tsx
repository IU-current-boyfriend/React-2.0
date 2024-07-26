import React, { useEffect, useState, useCallback } from "react";
import { Layout } from "antd";
import { RootState, useSelector } from "@/redux";
import { Icon } from "@/components/Icon";
import { RouteObjectType } from "@/routers/interface";
import { useLocation, useNavigate } from "react-router-dom";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight";
import LayoutMenu from "@/layouts/components//Menu";
import LayoutMain from "@/layouts/components/Main";
import logo from "@/assets/images/logo.svg";
import "./index.less";

const { Header, Sider } = Layout;

const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE;

const LayoutColumns: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isCollapse = useSelector((state: RootState) => state.global.isCollapse);
  const showMenuList = useSelector((state: RootState) => state.auth.showMenuList);
  const [menuActive, setMenuActive] = useState("");
  const [subMenuList, setSubMenuList] = useState<RouteObjectType[]>([]);

  // 路由路径变化，选中对应的菜单栏
  useEffect(() => {
    if (!showMenuList.length) return;
    setMenuActive(pathname);

    const menuItem = showMenuList.find(item => {
      return pathname === item.path || `/${pathname.split("/")[1]}` === item.path;
    });
    setMenuActive(pathname);
    setSubMenuList(menuItem?.children || []);
  }, [pathname]);

  const handleNavigation = useCallback((item: RouteObjectType) => {
    // 外部链接的特殊情况
    if (item.meta?.isLink) window.open(item.meta.isLink, "_blank");
    navigate(item.path!);
  }, []);

  const changeSubMenu = (item: RouteObjectType) => {
    setMenuActive(item.path!);
    setSubMenuList(item.children || []);
    handleNavigation(item.children?.length ? item.children[0] : item);
  };

  return (
    <section className="layout-columns">
      <div className="sider-split">
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
        </div>
        <div className="menu-list">
          {showMenuList.map(item => {
            return (
              <div
                key={item.path}
                className={`menu-item ${
                  (menuActive === item.path || `/${menuActive.split("/")[1]}` === item.path) && "menu-active"
                }`}
                onClick={() => changeSubMenu(item)}
              >
                <Icon name={item.meta!.icon!} />
                <span className="title sle">{item.meta?.title}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Sider width={210} collapsed={isCollapse} className={`${!subMenuList.length && "not-sider"}`}>
        {subMenuList.length ? (
          <>
            <div className="logo">
              <span className="logo-text">{isCollapse ? "H" : APP_TITLE}</span>
            </div>
            <LayoutMenu mode="inline" menuList={subMenuList}></LayoutMenu>
          </>
        ) : null}
      </Sider>
      <Layout>
        <Header>
          <ToolBarLeft />
          <ToolBarRight />
        </Header>
        <LayoutMain />
      </Layout>
    </section>
  );
};

export default LayoutColumns;
