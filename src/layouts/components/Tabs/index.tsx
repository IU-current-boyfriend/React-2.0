import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsProps } from "antd";
import { Icon } from "@/components/Icon";
import { RootState, useSelector } from "@/redux";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTab, removeTab } from "@/redux/modules/tabs";
import { MetaProps } from "@/routers/interface";
import MoreButton from "./components/MoreButton";
import "./index.less";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const type = "DraggableTabNode";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  index: React.Key;
  moveNode: (dragIndex: React.Key, hoverIndex: React.Key) => void;
}

const DraggableTabNode = ({ index, children, moveNode }: DraggableTabPaneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) return {};
      return { isOver: monitor.isOver() };
    },
    drop: (item: { index: React.Key }) => moveNode(item.index, index)
  });
  const [, drag] = useDrag({ type, item: { index }, collect: monitor => ({ isDragging: monitor.isDragging() }) });
  drop(drag(ref));
  return <div ref={ref}>{children}</div>;
};

const DraggableTabs: React.FC<TabsProps> = ({ items = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const fullPath = location.pathname + location.search;

  const [order, setOrder] = useState<React.Key[]>([]);

  const moveTabNode = (dragKey: React.Key, hoverKey: React.Key) => {
    const newOrder = order.slice();
    items.forEach(item => {
      if (item.key && newOrder.indexOf(item.key) === -1) newOrder.push(item.key);
    });
    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);
    setOrder(newOrder);
  };

  const renderTabBar: TabsProps["renderTabBar"] = (tabBarProps, DefaultTabBar) => (
    <DefaultTabBar {...tabBarProps}>
      {node => (
        <DraggableTabNode key={node.key} index={node.key!} moveNode={moveTabNode}>
          {node}
        </DraggableTabNode>
      )}
    </DefaultTabBar>
  );

  const orderItems = [...items].sort((a, b) => {
    const orderA = order.indexOf(a.key!);
    const orderB = order.indexOf(b.key!);
    if (orderA !== -1 && orderB !== -1) return orderA - orderB;
    if (orderA !== -1) return -1;
    if (orderB !== -1) return 1;
    const ia = items.indexOf(a);
    const ib = items.indexOf(b);
    return ia - ib;
  });

  const onChange = (path: string) => {
    navigate(path);
  };

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "remove" && typeof targetKey == "string") {
      dispatch(removeTab({ path: targetKey, isCurrent: targetKey == fullPath }));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Tabs
        hideAdd
        type="editable-card"
        className="tabs-box"
        size="middle"
        renderTabBar={renderTabBar}
        items={orderItems}
        activeKey={fullPath}
        onEdit={onEdit}
        onChange={onChange}
        tabBarExtraContent={<MoreButton path={fullPath} />}
      />
    </DndProvider>
  );
};

const LayoutTabs: React.FC = () => {
  const matches = useMatches();
  const dispatch = useDispatch();
  const location = useLocation();
  const fullPath = location.pathname + location.search;

  const tabsList = useSelector((state: RootState) => state.tabs.tabsList);
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList);
  const { tabs, tabsIcon } = useSelector((state: RootState) => state.global);

  useEffect(() => initTabs(), []);

  const initTabs = () => {
    flatMenuList.forEach(item => {
      if (item.meta?.isAffix && !item.meta.isHide && !item.meta.isFull) {
        const tabValue = {
          icon: item.meta.icon as string,
          title: item.meta.title as string,
          path: item.path as string,
          closable: !item.meta.isAffix
        };
        dispatch(addTab(tabValue));
      }
    });
  };

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    if (meta) {
      const tabValue = {
        icon: meta.icon as string,
        title: meta.title as string,
        path: fullPath,
        closable: !meta.isAffix
      };
      dispatch(addTab(tabValue));
    }
  }, [matches]);

  const items = tabsList.map(item => {
    return {
      key: item.path,
      label: (
        <>
          {tabsIcon && <Icon name={item.icon} />}
          {item.title}
        </>
      ),
      closable: item.closable
    };
  });

  return <>{tabs && <DraggableTabs items={items} />}</>;
};

export default LayoutTabs;
