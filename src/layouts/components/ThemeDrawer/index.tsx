import { Drawer, Divider, Switch, Popover, InputNumber, Tooltip } from "antd";
import { setGlobalState } from "@/redux/modules/global";
import { RootState, useDispatch, useSelector } from "@/redux";
import { LayoutOutlined, FireOutlined, SettingOutlined, CheckCircleFilled } from "@ant-design/icons";
import ColorPicker from "./components/ColorPicker";
import "./index.less";

const ThemeDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const {
    layout,
    compactAlgorithm,
    borderRadius,
    isDark,
    isGrey,
    isWeak,
    isCollapse,
    breadcrumb,
    breadcrumbIcon,
    tabs,
    tabsIcon,
    footer,
    themeDrawerVisible
  } = useSelector((state: RootState) => state.global);

  return (
    <Drawer
      title="主题配置"
      closable={false}
      maskClosable={true}
      open={themeDrawerVisible}
      width={300}
      className="theme-drawer"
      onClose={() => dispatch(setGlobalState({ key: "themeDrawerVisible", value: false }))}
    >
      {/* layout switching */}
      <Divider className="divider">
        <LayoutOutlined />
        布局切换
      </Divider>
      <div className="layout-box mb20">
        <Tooltip placement="top" title="纵向" arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item mb20 layout-vertical ${layout === "vertical" ? "layout-active" : ""}`}
            onClick={() => dispatch(setGlobalState({ key: "layout", value: "vertical" }))}
          >
            <div className="layout-dark"></div>
            <div className="layout-container">
              <div className="layout-light"></div>
              <div className="layout-content"></div>
            </div>
            {layout === "vertical" && <CheckCircleFilled />}
          </div>
        </Tooltip>
        <Tooltip placement="top" title="经典" arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item mb20 layout-classic ${layout === "classic" ? "layout-active" : ""}`}
            onClick={() => dispatch(setGlobalState({ key: "layout", value: "classic" }))}
          >
            <div className="layout-dark"></div>
            <div className="layout-container">
              <div className="layout-light"></div>
              <div className="layout-content"></div>
            </div>
            {layout === "classic" && <CheckCircleFilled />}
          </div>
        </Tooltip>
        <Tooltip placement="top" title="横向" arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item mb10 layout-transverse ${layout === "transverse" ? "layout-active" : ""}`}
            onClick={() => dispatch(setGlobalState({ key: "layout", value: "transverse" }))}
          >
            <div className="layout-dark"></div>
            <div className="layout-content"></div>
            {layout === "transverse" && <CheckCircleFilled />}
          </div>
        </Tooltip>
        <Tooltip placement="top" title="分栏" arrow={true} mouseEnterDelay={0.2}>
          <div
            className={`layout-item mb10 layout-columns ${layout === "columns" ? "layout-active" : ""}`}
            onClick={() => dispatch(setGlobalState({ key: "layout", value: "columns" }))}
          >
            <div className="layout-dark"></div>
            <div className="layout-light"></div>
            <div className="layout-content"></div>
            {layout === "columns" && <CheckCircleFilled />}
          </div>
        </Tooltip>
      </div>

      {/* theme settings */}
      <Divider className="divider">
        <FireOutlined />
        全局主题
      </Divider>
      <div className="theme-item">
        <span>主题颜色</span>
        <Popover placement="left" trigger="click" content={ColorPicker}>
          <label className="primary"></label>
        </Popover>
      </div>
      <div className="theme-item">
        <span>暗黑模式</span>
        <Switch
          checked={isDark}
          checkedChildren={<span className="dark-icon dark-icon-sun">🌞</span>}
          unCheckedChildren={<span className="dark-icon dark-icon-moon">🌛</span>}
          onChange={value => dispatch(setGlobalState({ key: "isDark", value }))}
        />
      </div>
      <div className="theme-item">
        <span>灰色模式</span>
        <Switch checked={isGrey} onChange={value => dispatch(setGlobalState({ key: "isGrey", value }))} />
      </div>
      <div className="theme-item">
        <span>色弱模式</span>
        <Switch checked={isWeak} onChange={value => dispatch(setGlobalState({ key: "isWeak", value }))} />
      </div>
      <div className="theme-item">
        <span>紧凑主题</span>
        <Switch checked={compactAlgorithm} onChange={value => dispatch(setGlobalState({ key: "compactAlgorithm", value }))} />
      </div>
      <div className="theme-item mb25">
        <span>圆角大小</span>
        <InputNumber
          min={1}
          max={20}
          style={{ width: 80 }}
          defaultValue={borderRadius}
          formatter={value => `${value}px`}
          parser={value => (value ? value!.replace("px", "") : 6) as number}
          onChange={value => {
            const newValue = value || 6;
            dispatch(setGlobalState({ key: "borderRadius", value: newValue }));
          }}
        />
      </div>

      {/* interface settings */}
      <Divider className="divider">
        <SettingOutlined />
        界面显示
      </Divider>
      <div className="theme-item">
        <span>折叠菜单</span>
        <Switch checked={isCollapse} onChange={value => dispatch(setGlobalState({ key: "isCollapse", value }))} />
      </div>
      <div className="theme-item">
        <span>面包屑</span>
        <Switch checked={breadcrumb} onChange={value => dispatch(setGlobalState({ key: "breadcrumb", value }))} />
      </div>
      <div className="theme-item">
        <span>面包屑图标</span>
        <Switch checked={breadcrumbIcon} onChange={value => dispatch(setGlobalState({ key: "breadcrumbIcon", value }))} />
      </div>
      <div className="theme-item">
        <span>标签栏</span>
        <Switch checked={tabs} onChange={value => dispatch(setGlobalState({ key: "tabs", value }))} />
      </div>
      <div className="theme-item">
        <span>标签栏图标</span>
        <Switch checked={tabsIcon} onChange={value => dispatch(setGlobalState({ key: "tabsIcon", value }))} />
      </div>
      <div className="theme-item">
        <span>页脚</span>
        <Switch checked={footer} onChange={value => dispatch(setGlobalState({ key: "footer", value }))} />
      </div>
    </Drawer>
  );
};

export default ThemeDrawer;
