import { Navigate } from "react-router-dom";
import { HOME_URL, LOGIN_URL } from "@/config";
import { RouteObjectType } from "@/routers/interface";
import Login from "@/views/login/index";
import NotAuth from "@/components/Error/403";
import NotFound from "@/components/Error/404";
import NotNetwork from "@/components/Error/500";
import RouterGuard from "../helper/RouterGuard";
import NProgress from "@/config/nprogress";

/**
 * staticRouter
 */
export const staticRouter: RouteObjectType[] = [
  {
    path: "/",
    element: <Navigate to={HOME_URL} />
  },
  {
    path: LOGIN_URL,
    element: <Login />,
    meta: {
      title: "登录"
    }
  },
  // error pages
  {
    path: "/403",
    element: <NotAuth />,
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    element: <NotFound />,
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    element: <NotNetwork />,
    meta: {
      title: "500页面"
    }
  },
  // Set <></> here first to prevent page refresh 404
  {
    path: "*",
    element: <></>
  }
];

// Wrap each element with a higher-order component
export const wrappedStaticRouter = staticRouter.map(route => {
  return {
    ...route,
    element: <RouterGuard>{route.element as JSX.Element}</RouterGuard>,
    loader: () => {
      NProgress.start();
      return { ...route.meta };
    }
  };
});
