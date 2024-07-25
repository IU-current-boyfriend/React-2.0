import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { RouteObjectType } from "@/routers/interface";
import { MetaProps } from "@/routers/interface";
import { RootState, useSelector } from "@/redux";
import { Icon } from "@/components/Icon";
import { Menu, MenuProps } from "antd";
import { getOpenKeys } from "@/utils";
import "./index.less";

interface LayoutMenuProps {
  mode: MenuProps["mode"];
  menuList?: RouteObjectType[];
  menuSplit?: boolean;
}

const LayoutMenu: React.FC<LayoutMenuProps> = ({ mode, menuList, menuSplit }) => {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();
  const layout = useSelector((state: RootState) => state.global.layout);
  const isDark = useSelector((state: RootState) => state.global.isDark);
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse);
  const showMenuList = useSelector((state: RootState) => state.auth.showMenuList);
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList);
  const siderInverted = useSelector((state: RootState) => state.global.siderInverted);
  const headerInverted = useSelector((state: RootState) => state.global.headerInverted);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [splitSelectedKeys, setSplitSelectedKeys] = useState<string[]>([]);

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  }

  const handleMenuAsAntdFormat = (list: RouteObjectType[]): MenuItem[] => {
    return list.map(item => {
      return !item.children?.length
        ? getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />)
        : getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />, handleMenuAsAntdFormat(item.children!));
    });
  };

  const antdMenuList = useMemo(() => handleMenuAsAntdFormat(menuList ?? showMenuList), [menuList, showMenuList]);

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    const path = meta?.activeMenu ?? pathname;

    // Set Selected Keys
    setSelectedKeys([path]);

    // Set Split Selected Keys (find can be found to represent children)
    const splitKeys = showMenuList.find(item => item.path === `/${path.split("/")[1]}`) ? `/${path.split("/")[1]}` : path;

    setSplitSelectedKeys([splitKeys]);

    // Use setTimeout to prevent style exceptions from menu expansion
    setTimeout(() => isCollapse || setOpenKeys(getOpenKeys(pathname)));
  }, [matches, isCollapse]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  const handleMenuNavigation = (path: string) => {
    const menu = flatMenuList.find(item => item.path === path);
    if (menu?.meta?.isLink) return window.open(menu.meta.isLink, "_blank");
    navigate(path);
  };

  const clickMenu: MenuProps["onClick"] = ({ key }) => {
    // If not split menu
    if (!menuSplit) return handleMenuNavigation(key);

    // if split mennu
    const children = showMenuList.find(item => item.path === key)?.children;
    if (children?.length) return handleMenuNavigation(children[0].path!);
    handleMenuNavigation(key);
  };

  const isClassicLayout = useMemo(() => layout === "classic", [layout]);
  const isTransverseLayout = useMemo(() => layout === "transverse", [layout]);

  const isDarkTheme = useMemo(() => {
    if (isDark) return true;
    if (headerInverted && isTransverseLayout) return true;
    if (headerInverted && isClassicLayout && menuSplit) return true;
    if (siderInverted && !isTransverseLayout && !menuSplit) return true;
    return false;
  }, [layout, isDark, headerInverted, siderInverted, menuSplit]);

  return (
    <Menu
      theme={isDarkTheme ? "dark" : "light"}
      mode={mode}
      selectedKeys={menuSplit ? splitSelectedKeys : selectedKeys}
      onClick={clickMenu}
      items={antdMenuList}
      /* 因为transverse模式时的sider不需要这些打开菜单的事件处理函数 */
      {...(!isTransverseLayout && { openKeys, onOpenChange })}
    />
  );
};

export default LayoutMenu;
