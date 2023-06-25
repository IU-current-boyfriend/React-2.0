import { Layout } from "antd";
import { useDebounceFn } from "ahooks";
import { RefreshContext } from "@/context/Refresh";
import { useEffect, createRef, useContext } from "react";
import { RouteObjectType } from "@/routers/interface";
import { useLocation, useOutlet } from "react-router-dom";
import { setGlobalState } from "@/redux/modules/global";
import { RootState, useDispatch, useSelector } from "@/redux";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Maximize from "./components/Maximize";
import LayoutTabs from "@/layouts/components/Tabs";
import LayoutFooter from "@/layouts/components/Footer";
import "./index.less";

type RouteTypeWithNodeRef = {
  nodeRef?: React.Ref<HTMLElement> | undefined;
} & RouteObjectType;

const { Content } = Layout;

const LayoutMain: React.FC = () => {
  const outlet = useOutlet();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { outletShow } = useContext(RefreshContext);

  const maximize = useSelector((state: RootState) => state.global.maximize);
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse);
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList);

  // Monitor window changes, collapse menu
  const { run } = useDebounceFn(
    () => {
      const screenWidth = document.body.clientWidth;
      if (!isCollapse && screenWidth < 1200) {
        dispatch(setGlobalState({ key: "isCollapse", value: true }));
      }
      if (isCollapse && screenWidth > 1200) {
        dispatch(setGlobalState({ key: "isCollapse", value: false }));
      }
    },
    { wait: 100 }
  );
  useEffect(() => {
    window.addEventListener("resize", run, false);
    return () => window.removeEventListener("resize", run);
  }, []);

  // Monitor whether the current page is maximized, dynamically add class
  useEffect(() => {
    const root = document.getElementById("root") as HTMLElement;
    if (maximize) root.classList.add("main-maximize");
    else root.classList.remove("main-maximize");
  }, [maximize]);

  // Solve the transition animation that causes useEffect to execute multiple times
  // @see: http://reactcommunity.org/react-transition-group/with-react-router
  const menuList: RouteTypeWithNodeRef[] = flatMenuList.map(item => ({ ...item, nodeRef: createRef() }));
  const { nodeRef } = menuList.find(route => route.path === pathname) ?? {};

  return (
    <>
      <Maximize />
      <LayoutTabs />
      <SwitchTransition>
        <CSSTransition classNames="fade" key={pathname} nodeRef={nodeRef} timeout={300} exit={false} unmountOnExit>
          <Content ref={nodeRef}>{outletShow && outlet}</Content>
        </CSSTransition>
      </SwitchTransition>
      <LayoutFooter />
    </>
  );
};

export default LayoutMain;
