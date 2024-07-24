import React from "react";
import { Layout } from "antd";
import { RootState, useSelector } from "@/redux";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight";
import LayoutMenu from "@/layouts/components//Menu";
import LayoutMain from "@/layouts/components/Main";
import logo from "@/assets/images/logo.svg";
import "./index.less";

const { Header, Sider } = Layout;

const LayoutClassic: React.FC = () => {
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse);

  return (
    <section className={`layout-classic`}>
      <Sider width={210} collapsed={isCollapse}>
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          {!isCollapse && <h2 className="logo-text">Hooks Admin</h2>}
        </div>
        <LayoutMenu />
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

export default LayoutClassic;
