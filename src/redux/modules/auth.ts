import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/redux/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthMenuListApi } from "@/api/modules/login";
import { getFlatMenuList, getShowMenuList } from "@/utils";
import { RouteObjectType } from "@/routers/interface";

const authState: AuthState = {
  // Has the menu list request ended
  authMenuLoading: true,
  // List of button permissions
  authButtonList: {},
  // List of menu permissions
  authMenuList: [],
  // Menu permission list ==> left menu bar rendering, need to remove isHide == true
  showMenuList: [],
  // Menu permission list ==> flattened one-dimensional array menu, mainly used to add dynamic routing
  flatMenuList: []
};

export const fetchMenuList = createAsyncThunk("hooks-auth/fetchMenuList", async (_authState, { rejectWithValue }) => {
  try {
    const { data } = await getAuthMenuListApi();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "hooks-auth",
  initialState: authState,
  reducers: {
    setAuthMenuList(state, { payload }: PayloadAction<RouteObjectType[]>) {
      state.authMenuList = payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchMenuList.fulfilled, (state, { payload }: PayloadAction<RouteObjectType[]>) => {
      state.authMenuList = payload;
      state.flatMenuList = getFlatMenuList(payload);
      state.showMenuList = getShowMenuList(payload);
      state.authMenuLoading = false;
    });
  }
});

export const { setAuthMenuList } = authSlice.actions;
export default authSlice.reducer;
