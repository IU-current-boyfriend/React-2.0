import { TabsState, TabsListProp } from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tabsState: TabsState = {
  tabsList: []
};

const tabsSlice = createSlice({
  name: "hooks-tabs",
  initialState: tabsState,
  reducers: {
    setTabsList(state, { payload }: PayloadAction<TabsState["tabsList"]>) {
      state.tabsList = payload;
    },
    addTab(state, { payload }: PayloadAction<TabsListProp>) {
      if (state.tabsList.every(item => item.path !== payload.path)) {
        state.tabsList.push(payload);
      }
    },
    removeTab(state, { payload }: PayloadAction<{ path: string; isCurrent: boolean }>) {
      const tabsList = state.tabsList;
      // 没有close图标的tab栏不可删除
      if (!tabsList.find(item => item.path === payload.path)?.closable) return;
      if (payload.isCurrent) {
        tabsList.forEach((item, index) => {
          if (item.path !== payload.path) return;
          const nextTab = tabsList[index + 1] || tabsList[index - 1];
          if (!nextTab) return;
          window.$navigate(nextTab.path);
        });
      }
      state.tabsList = tabsList.filter(item => item.path !== payload.path);
    },
    closeMultipleTab(state, { payload }: PayloadAction<{ path?: string }>) {
      state.tabsList = state.tabsList.filter(item => {
        return item.path === payload.path || !item.closable;
      });
    },
    setTabTitle(state, { payload }: PayloadAction<string>) {
      const nowFullPath = location.hash.substring(1);
      state.tabsList.forEach(item => {
        if (item.path == nowFullPath) item.title = payload;
      });
    }
  }
});

export const { setTabsList, addTab, removeTab, closeMultipleTab, setTabTitle } = tabsSlice.actions;
export default tabsSlice.reducer;
