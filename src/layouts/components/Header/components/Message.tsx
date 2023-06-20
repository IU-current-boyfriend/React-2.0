import { Badge, Popover, Tabs, Empty } from "antd";
import type { TabsProps } from "antd";

const Message: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `通知 (${5})`,
      children: <Empty className="pt50 pb80" />
    },
    {
      key: "2",
      label: `消息 (${0})`,
      children: <Empty className="pt50 pb80" />
    },
    {
      key: "3",
      label: `代办 (${0})`,
      children: <Empty className="pt50 pb80" />
    }
  ];

  const content = <Tabs defaultActiveKey="1" size="middle" tabBarGutter={50} className="pr10 pl10" items={items} />;

  return (
    <Popover placement="bottom" content={content} trigger="click">
      <Badge count={5}>
        <i className="iconfont icon-xiaoxi"></i>
      </Badge>
    </Popover>
  );
};
export default Message;
