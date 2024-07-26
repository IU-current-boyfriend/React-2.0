import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObjectType } from "../interface";
import { getFlatMenuList } from "@/utils";
import LazyComponent from "./LazyComponent";
import RouterGuard from "./RouterGuard";
import LayoutIndex from "@/layouts";

// Import all view files in the views directory
const modules = import.meta.glob("@/views/**/*.tsx") as Record<string, Parameters<typeof lazy>[number]>;

/**
 * @description Convert menuList to the format required by react-router
 * @param {Array} authMenuList Permissions menu list
 * @returns react-router
 */
export const convertToDynamicRouterFormat = (authMenuList: RouteObjectType[]) => {
  // Flatten the routing first here, you cannot directly use flatMenuList in redux
  const flatMenuList = getFlatMenuList(authMenuList);
  const handleMenuList = flatMenuList.map(item => {
    item.children && delete item.children;
    // Set redirection component
    if (item.redirect) item.element = <Navigate to={item.redirect} />;

    // Convert element to antd component
    if (item.element && typeof item.element == "string") {
      const Component = LazyComponent(lazy(modules["/src/views" + item.element + ".tsx"]));
      item.element = <RouterGuard>{Component}</RouterGuard>;
      item.loader = () => {
        return { ...item.meta };
      };
    }
    return item;
  });

  const dynamicRouter: RouteObjectType[] = [
    {
      element: <LayoutIndex />,
      children: []
    }
  ];

  // Add to Dynamic routing
  handleMenuList.forEach(item => {
    // 例如数据大屏不需要在布局组件中，它是需要全屏展示的，动态路由细分为两种
    if (item.meta?.isFull) dynamicRouter.push(item);
    else dynamicRouter[0].children?.push(item);
  });

  return dynamicRouter;
};
