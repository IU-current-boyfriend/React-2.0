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
    addTabs(state, { payload }: PayloadAction<TabsListProp>) {
      if (state.tabsList.every(item => item.path !== payload.path)) {
        state.tabsList.push(payload);
      }
    },
    removeTabs(state, { payload }: PayloadAction<{ tabPath: string; isCurrent: boolean }>) {
      const tabsList = state.tabsList;
      if (payload.isCurrent) {
        tabsList.forEach((item, index) => {
          if (item.path !== payload.tabPath) return;
          const nextTab = tabsList[index + 1] || tabsList[index - 1];
          if (!nextTab) return;
          window.$navigate(nextTab.path);
        });
      }
      state.tabsList = tabsList.filter(item => item.path !== payload.tabPath);
    }
  }
});

export const { addTabs, removeTabs, setTabsList } = tabsSlice.actions;
export default tabsSlice.reducer;
