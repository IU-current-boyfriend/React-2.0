import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "@/redux/interface";
import { DEFAULT_PRIMARY } from "@/config";

const globalState: GlobalState = {
  // layout mode (vertical | classic | transverse | columns)
  layout: "vertical",
  // antd component size ("small" | "middle" | "large")
  componentSize: "middle",
  // antd compact theme
  compactAlgorithm: false,
  // antd border radius
  borderRadius: 6,
  // current system language
  language: null,
  // Whether the current page is full screen
  maximize: false,
  // theme color
  primary: DEFAULT_PRIMARY,
  // dark mode
  isDark: false,
  // gray mode
  isGrey: false,
  // weakness mode
  isWeak: false,
  // menu splitting
  menuSplit: false,
  // siderbar Invert Color
  siderInverted: false,
  // head Inverted Color
  headerInverted: false,
  // collapse menu
  isCollapse: false,
  // breadcrumb
  breadcrumb: true,
  // breadcrumbIcon
  breadcrumbIcon: true,
  // tabs
  tabs: true,
  // tabsIcon
  tabsIcon: true,
  // footer
  footer: true,
  // Theme box display status
  themeDrawerVisible: false
};

const globalSlice = createSlice({
  name: "hooks-global",
  initialState: globalState,
  reducers: {
    setGlobalState<T extends keyof GlobalState>(state: GlobalState, { payload }: PayloadAction<ObjToKeyValUnion<GlobalState>>) {
      state[payload.key as T] = payload.value as GlobalState[T];
    }
  }
});

export const { setGlobalState } = globalSlice.actions;
export default globalSlice.reducer;
