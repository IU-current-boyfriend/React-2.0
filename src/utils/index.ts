import { RouteObjectType } from "@/routers/interface";

/**
 * @description Get the corresponding greeting for the current time.
 * @returns {String}
 */
export function getTimeState() {
  let timeNow = new Date();
  let hours = timeNow.getHours();
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
  if (hours >= 10 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

/**
 * @description Convert a 3-digit HEX color code to a 6-digit code.
 * @returns {String}
 */
export function convertToSixDigitHexColor(str: string) {
  if (str.length > 4) return str.toLocaleUpperCase();
  else return (str[0] + str[1] + str[1] + str[2] + str[2] + str[3] + str[3]).toLocaleUpperCase();
}

/**
 * @description Get the default language of the browser.
 * @returns {String}
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}

/**
 * @description Flatten the menu using recursion for easier addition of dynamic routes.
 * @param {Array} menuList - The menu list.
 * @returns {Array}
 */
export function getFlatMenuList(menuList: RouteObjectType[]): RouteObjectType[] {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

/**
 * @description Use recursion to filter out the menu items that need to be rendered in the left menu (excluding menus with isHide == true).
 * @param {Array} menuList - The menu list.
 * @returns {Array}
 */
export function getShowMenuList(menuList: RouteObjectType[]) {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

/**
 * @description Use recursion to find all breadcrumbs and store them in redux.
 * @param {Array} menuList - The menu list.
 * @param {Array} parent - The parent menu.
 * @param {Object} result - The processed result.
 * @returns {Object}
 */
export const getAllBreadcrumbList = (
  menuList: RouteObjectType[],
  parent: RouteObjectType[] = [],
  result: { [key: string]: RouteObjectType[] } = {}
) => {
  for (const item of menuList) {
    result[item.meta!.key!] = [...parent, item];
    if (item.children) getAllBreadcrumbList(item.children, result[item.meta!.key!], result);
  }
  return result;
};

/**
 * @description Get the subMenu keys that need to be expanded.
 * @param {String} path - The current path.
 * @returns {Array}
 */
export const getOpenKeys = (path: string): string[] => {
  let currentKey: string = "";
  let openKeys: string[] = [];
  let pathSegments: string[] = path.split("/").map((segment: string) => "/" + segment);
  for (let i: number = 1; i < pathSegments.length - 1; i++) {
    currentKey += pathSegments[i];
    openKeys.push(currentKey);
  }
  return openKeys;
};

/**
 * 获取一级菜单
 * @param menu
 */
export const getFirstLevelMenu = (menuList: RouteObjectType[]): RouteObjectType[] => {
  return menuList.map(item => {
    return {
      ...item,
      children: undefined
    };
  });
};
