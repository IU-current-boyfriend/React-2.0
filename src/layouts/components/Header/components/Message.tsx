import { Badge, Popover, Tabs, Empty } from "antd";
import type { TabsProps } from "antd";

const Notice: React.FC = () => {
  const noticeList = [
    { title: "一键三连 Hooks-Admin 🧡", icon: "/src/assets/images/notice01.png", time: "一分钟前" },
    { title: "一键三连 Hooks-Admin 💙", icon: "/src/assets/images/notice02.png", time: "一小时前" },
    { title: "一键三连 Hooks-Admin 💚", icon: "/src/assets/images/notice03.png", time: "半天前" },
    { title: "一键三连 Hooks-Admin 💜", icon: "/src/assets/images/notice04.png", time: "一星期前" },
    { title: "一键三连 Hooks-Admin 💛", icon: "/src/assets/images/notice05.png", time: "一个月前" }
  ];
  return (
    <div className="notice-list">
      {noticeList.map(item => (
        <div className="notice-item" key={item.icon}>
          <img src={item.icon} alt="" className="notice-icon" />
          <div className="notice-content">
            <span className="notice-title">{item.title}</span>
            <span className="notice-title">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Message: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `通知(${5})`,
      children: <Notice />
    },
    {
      key: "2",
      label: `消息(${0})`,
      children: <Empty className="pt60 pb90" description="暂无消息" />
    },
    {
      key: "3",
      label: `待办(${0})`,
      children: <Empty className="pt60 pb90" description="暂无待办" />
    }
  ];

  const content = <Tabs defaultActiveKey="1" size="middle" tabBarGutter={50} className="pr12 pl12" items={items}></Tabs>;
  return (
    <Popover placement="bottom" content={content} trigger="click">
      <Badge count={5} style={{ color: "#ffffff" }}>
        <i className="iconfont icon-xiaoxi"></i>
      </Badge>
    </Popover>
  );
};
export default Message;
