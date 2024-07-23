import { useState, useEffect, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { RouterProvider as Router, createHashRouter, RouteObject } from "react-router-dom";
import { convertToDynamicRouterFormat } from "./helper/ConvertRouter";
import { wrappedStaticRouter } from "./modules/staticRouter";
import { RootState, useSelector, useDispatch } from "@/redux";
import { RouteObjectType } from "./interface";
import useTheme from "@/hooks/useTheme";
import useMessage from "@/hooks/useMessage";
import NotFound from "@/components/Error/404";
import { fetchMenuList } from "@/redux/modules/auth";
import { notification } from "@/hooks/useMessage";
import { setToken } from "@/redux/modules/user";

/**
 * @description Route file entry
 */
const RouterProvider: React.FC = () => {
  // initTheme && useMessage
  const { initTheme } = useTheme();
  initTheme();
  useMessage();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token, shallowEqual);
  const authMenuLoading = useSelector((state: RootState) => state.auth.authMenuLoading, shallowEqual);
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList, shallowEqual);
  const [routerList, setRouterList] = useState<RouteObjectType[]>(wrappedStaticRouter);

  /**
   * 其实useCallback在这里也挺有用的，因为组件再次渲染的时候，它就不用创建了，
   * 但是这里面存在闭包陷阱的问题，其实和useState类似、useMemo也是同样道理，
   * 所以我Message组件里面没有设置useCallback的时候，是因为理解没到位useCallback；
   *
   */

  // MenuList is Empty
  const handleNoAuth = useCallback(() => {
    notification.warning({
      message: "无权限访问",
      description: "当前账号无任何菜单权限，请联系系统管理员😁!"
    });
    dispatch(setToken(""));
  }, []);

  // Refresh Request Menu Data
  const handleFetchMenuList = useCallback(async () => {
    if (token) {
      try {
        // unwrap()作用：可以使用tryCatch捕获react-redux中thunk返回的Promise对象抛出的异常
        await dispatch(fetchMenuList()).unwrap();
      } catch (error) {
        dispatch(setToken(""));
      }
    }
  }, []);

  useEffect(() => {
    // The menu request has ended and there is no data available
    if (!authMenuList.length && !authMenuLoading && token) {
      handleNoAuth();
      return;
    }

    // When refreshing the page, there is no menu data && no menu requested, update menu list
    if (!authMenuList.length && authMenuLoading) {
      handleFetchMenuList();
      return;
    }

    const dynamicRouter = convertToDynamicRouterFormat(authMenuList);
    let allRouter = [dynamicRouter, ...wrappedStaticRouter];

    // To prevent 404 from refreshing the page, add the * route at the end
    allRouter.forEach(item => item.path === "*" && (item.element = <NotFound />));
    setRouterList(allRouter);
  }, [authMenuList]);

  return <Router router={createHashRouter(routerList as RouteObject[])} />;
};

export default RouterProvider;
