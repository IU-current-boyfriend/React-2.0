import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { RouteObjectType } from "@/routers/interface";
import { MetaProps } from "@/routers/interface";
import { RootState, useSelector } from "@/redux";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { Menu, MenuProps } from "antd";
import { getOpenKeys } from "@/utils";

const LayoutMenu: React.FC = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const isDark = useSelector((state: RootState) => state.global.isDark);
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse);
  const showMenuList = useSelector((state: RootState) => state.auth.showMenuList);
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList);

  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);

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

  useEffect(() => {
    setMenuList(handleMenuAsAntdFormat(showMenuList));
  }, []);

  const handleMenuAsAntdFormat = (menuList: RouteObjectType[], newArr: MenuItem[] = []) => {
    menuList.forEach(item => {
      if (!item?.children?.length) return newArr.push(getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />));
      newArr.push(getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />, handleMenuAsAntdFormat(item.children)));
    });
    return newArr;
  };

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    const keys = meta?.activeMenu ?? pathname;
    setSelectedKeys([keys]);
    // Use setTimeout to prevent style exceptions from menu expansion
    setTimeout(() => isCollapse || setOpenKeys(getOpenKeys(pathname)));
  }, [matches, isCollapse]);

  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  const clickMenu: MenuProps["onClick"] = ({ key }) => {
    const menu = flatMenuList.find(item => item.path === key);
    if (menu?.meta?.isLink) return window.open(menu.meta.isLink, "_blank");
    navigate(key);
  };

  return (
    <Menu
      theme={isDark ? "dark" : "light"}
      mode={"inline"}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      onClick={clickMenu}
      items={menuList}
    />
  );
};

export default LayoutMenu;
