import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { getFirstLevelMenuList } from "@/utils";
import { useLocation } from "react-router-dom";
import { RouteObjectType } from "@/routers/interface";
import { RootState, useSelector } from "@/redux";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight";
import LayoutMenu from "@/layouts/components//Menu";
import LayoutMain from "@/layouts/components/Main";
import CollapseIcon from "../components/Header/components/CollapseIcon";
import logo from "@/assets/images/logo.svg";
import "./index.less";

const { Header, Sider } = Layout;

const LayoutClassic: React.FC = () => {
  const { pathname } = useLocation();
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse);
  // menuSplit是菜单分割的功能，只有经典布局classic模式下才存在，并且对于菜单sider来讲，只会显示一级菜单
  const menuSplit = useSelector((state: RootState) => state.global.menuSplit);
  // 需要展示的菜单列表
  const showMenuList = useSelector((state: RootState) => state.auth.showMenuList);

  // 只包含一级菜单，用于顶部的menu栏
  const firstLevelMenuList = getFirstLevelMenuList(showMenuList);

  // 左侧的menu菜单栏
  const [subMenuList, setSubMenuList] = useState<RouteObjectType[]>([]);

  useEffect(() => {
    if (menuSplit) changeSubMenu();
  }, [pathname, menuSplit]);

  const changeSubMenu = () => {
    const menuItem = showMenuList.find(item => {
      return pathname === item.path || `/${pathname.split("/")[1]}` === item.path;
    });

    setSubMenuList(menuItem?.children || []);
  };

  return (
    <section className="layout-classic">
      <Header>
        <div className={`header-lf ${menuSplit ? "hide-logo" : "mask-image"}`}>
          <div className="logo">
            <img src={logo} alt="logo" className="logo-img" />
            <h2 className="logo-text">Hooks Admin</h2>
          </div>
          {menuSplit ? <LayoutMenu mode="horizontal" menuSplit menuList={firstLevelMenuList} /> : <ToolBarLeft />}
        </div>
        <div className="header-ri">
          <ToolBarRight />
        </div>
      </Header>
      <div className="classic-content">
        <Sider width={210} collapsed={isCollapse} className={`${!subMenuList.length && menuSplit ? "not-sider" : ""}`}>
          {menuSplit ? (
            <>
              {subMenuList.length ? (
                <>
                  <LayoutMenu mode="inline" menuList={subMenuList} />
                  <div className="collapse-box">
                    <CollapseIcon />
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <LayoutMenu mode="inline" />
          )}
        </Sider>
        <div className="classic-main">
          <LayoutMain />
        </div>
      </div>
    </section>
  );
};

export default LayoutClassic;
