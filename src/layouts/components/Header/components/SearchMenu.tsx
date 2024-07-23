import React, { useRef, useState, useEffect, useCallback } from "react";
import { Empty, Input, InputRef, Modal } from "antd";
import { SearchOutlined, EnterOutlined } from "@ant-design/icons";
import { Icon } from "@/components/Icon";
import { RouteObjectType } from "@/routers/interface";
import { RootState, useSelector } from "@/redux";
import { useDebounce } from "ahooks";

const SearchMenu: React.FC = () => {
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList);
  const inputRef = useRef<InputRef>(null);
  const menuListRef = useRef<HTMLDivElement>(null);

  const [activePath, setActivePath] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState<RouteObjectType[]>([]);

  const debounceSearchValue = useDebounce(searchValue, { wait: 300 });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = useCallback(() => setIsModalOpen(true), []);
  const handleCancel = useCallback(() => setIsModalOpen(false), []);
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value), []);

  // 上下键的滚动具体逻辑
  const keyPressUpOrDown = (direction: number) => {
    const { length } = searchList;
    // 没有搜索到结果
    if (length === 0) return;
    const index = searchList.findIndex(item => item.path! === activePath);
    // 我的需求是如果是向上是0的话，就到数组的最后一项，如果是数组最后一项，就到第一项,可以这样写，方式一
    // const newIndex = index + direction < 0 ? length - 1 : index + direction > length - 1 ? 0 : index + direction;

    // 可以这样写，方式二，小技巧，限制超出界限的情况
    const newIndex = (index + direction + length) % length; // 计算的当前的索引值
    // 例如一共2个元素 :
    /**
     * direction -1向上
     * 场景1: index + direction = -1, index = 0 ;  0 + -1 = -1 + 2 => 1 % 2 => 1 => 最后一项
     *
     *
     *
     * direction 1向下
     * 场景2: index + direction = 2, index = 1; 1 + 1 = 2 + 2 % 2 => 0 => 元素第一项
     *
     *
     * 场景3: diretion可以向上、可以向下, 3个元素
     * 0 <= index + direction <= length - 1 => 1 + 1 => 2 + 3 % 3 => 2 索引值
     *
     */
    // index + direction < 0  => length - 1 ||  > length - 1 => 0 ||  [0, 1] = index - direction

    // 设置高亮
    setActivePath(searchList[newIndex].path!);

    // 滚动
    if (menuListRef.current?.firstElementChild) {
      const menuItemHeight = menuListRef.current.firstElementChild.clientHeight + 12 || 0;
      menuListRef.current.scrollTop = newIndex * menuItemHeight;
    }
  };

  // 上下键的监听事件
  const handleKeyUpOrDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      keyPressUpOrDown(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      keyPressUpOrDown(1);
    }
  };

  // 当input控件的值变化的时候
  useEffect(() => {
    setSearchList(
      debounceSearchValue
        ? // 过滤条件，看meta和path中是否包含输入的字符
          flatMenuList.filter(
            item =>
              item.path!.toLowerCase().includes(debounceSearchValue.toLowerCase()) ||
              item.meta!.title!.toLocaleLowerCase().includes(debounceSearchValue.toLowerCase())
          )
        : []
    );
  }, [debounceSearchValue]);

  // 如果searchList发生变化的时候
  useEffect(() => {
    // 控制搜索结果的高亮，默认第一个结果高亮
    searchList.length ? setActivePath(searchList[0].path!) : setActivePath("");
  }, [searchList]);

  const menuMouseEnter = useCallback((item: RouteObjectType) => setActivePath(item.path!), []);

  // 注册键盘事件
  useEffect(() => {
    const handler = isModalOpen ? window.addEventListener : window.removeEventListener;
    handler("keydown", handleKeyUpOrDown);
    // 这个clear effect函数不能是handler变量，因为是clean effect是闭包函数，所以会执行多次
    return () => window.removeEventListener("keydown", handleKeyUpOrDown);
  }, [isModalOpen, handleKeyUpOrDown]);

  // 控制弹窗
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => inputRef.current?.focus({ cursor: "start" }));
    } else {
      setSearchValue("");
    }
  }, [isModalOpen]);

  return (
    <>
      <i className="iconfont icon-sousuo" onClick={showModal}></i>
      <Modal className="search-modal" width={600} open={isModalOpen} footer={null} closable={false} onCancel={handleCancel}>
        <Input
          ref={inputRef}
          placeholder="菜单搜索：支持菜单名称、路径"
          size="large"
          prefix={<SearchOutlined style={{ fontSize: "18px" }} />}
          allowClear={true}
          value={searchValue}
          onChange={handleInputChange}
        />
        {searchList.length ? (
          <div className="menu-list" ref={menuListRef}>
            {searchList.map(item => (
              <div
                key={item.path}
                className={`menu-item ${item.path === activePath && "menu-active"}`}
                onMouseEnter={() => menuMouseEnter(item)}
              >
                <Icon className="menu-icon" name={item.meta!.icon!} />
                <span className="menu-title">{item.meta?.title}</span>
                <EnterOutlined className="menu-enter"></EnterOutlined>
              </div>
            ))}
          </div>
        ) : (
          <Empty className="mt40 mb30" description="暂无菜单" />
        )}
      </Modal>
    </>
  );
};
export default SearchMenu;
