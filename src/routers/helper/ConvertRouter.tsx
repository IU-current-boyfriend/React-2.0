import { lazy } from "react";
import { getFlatMenuList } from "@/utils";
import { RouteObjectType } from "../interface";
import LazyComponent from "./LazyComponent";
import RouterGuard from "./RouterGuard";
import LayoutIndex from "@/layouts";

const modules = import.meta.glob("@/views/**/*.tsx") as Record<string, Parameters<typeof lazy>[number]>;

export const convertToDynamicRouterFormat = (authMenuList: RouteObjectType[]) => {
  // Flatten the routing first here, you cannot directly use flatMenuList in redux
  const flatMenuList = getFlatMenuList(authMenuList);
  flatMenuList.forEach(item => {
    item.children && delete item.children;
    if (item.element && typeof item.element == "string") {
      const Component = LazyComponent(lazy(modules["/src/views" + item.element + ".tsx"]));
      item.element = <RouterGuard>{Component}</RouterGuard>;
      item.loader = () => {
        return { ...item.meta };
      };
    }
  });
  const dynamicRouter: RouteObjectType = {
    element: <LayoutIndex />,
    children: flatMenuList
  };
  return dynamicRouter;
};
