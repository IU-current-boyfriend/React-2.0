import React, { useRef, useState } from "react";
import { Empty, Input, InputRef, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Icon } from "@/components/Icon";

const SearchMenu: React.FC = () => {
  const inputRef = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      inputRef.current?.focus({ cursor: "start" });
    }, 10);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        />
        {false && <Empty className="mt35 mb25" description="暂无菜单" />}
        {true && (
          <div className="menu-list">
            <div className="menu-item">
              <Icon className="menu-icon" name="HomeOutlined" />
              <span className="menu-title">首页</span>
            </div>
            <div className="menu-item">
              <Icon className="menu-icon" name="InsertRowAboveOutlined" />
              <span className="menu-title">超级表格</span>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
export default SearchMenu;
