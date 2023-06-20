import { useState, useEffect } from "react";
import { RouterProvider as Router, createHashRouter, RouteObject } from "react-router-dom";
import { convertToDynamicRouterFormat } from "./helper/ConvertRouter";
import { wrappedStaticRouter } from "./modules/staticRouter";
import { RootState, useSelector } from "@/redux";
import { RouteObjectType } from "./interface";
import useTheme from "@/hooks/useTheme";
import useMessage from "@/hooks/useMessage";
import NotFound from "@/components/Error/404";

const RouterProvider: React.FC = () => {
  // initTheme && useMessage
  const { initTheme } = useTheme();
  initTheme();
  useMessage();

  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList);
  const [routerList, setRouterList] = useState<RouteObjectType[]>(wrappedStaticRouter);

  useEffect(() => {
    const dynamicRouter = convertToDynamicRouterFormat(authMenuList);
    let allRouter = authMenuList.length ? [dynamicRouter, ...wrappedStaticRouter] : wrappedStaticRouter;

    // To prevent 404 from refreshing the page, add the * route at the end
    allRouter.forEach(item => item.path === "*" && (item.element = <NotFound />));
    setRouterList(allRouter);
  }, [authMenuList]);

  return <Router router={createHashRouter(routerList as RouteObject[])} />;
};

export default RouterProvider;
