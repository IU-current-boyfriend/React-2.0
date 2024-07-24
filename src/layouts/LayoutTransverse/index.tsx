import React from "react";
import { Layout } from "antd";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight";
import LayoutMenu from "@/layouts/components//Menu";
import LayoutMain from "@/layouts/components/Main";
import logo from "@/assets/images/logo.svg";
import "./index.less";

const { Header } = Layout;

const LayoutVertical: React.FC = () => {
  return (
    <section className={`layout-transverse`}>
      <Header>
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          <h2 className="logo-text">Hooks Admin</h2>
        </div>
        <LayoutMenu mode="horizontal" />
        <ToolBarRight />
      </Header>
      <Layout>
        <LayoutMain />
      </Layout>
    </section>
  );
};

export default LayoutVertical;
