import { useRef } from "react";
import { HomeOutlined, UserOutlined, FormOutlined, LoginOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { type MenuProps, Dropdown, Avatar } from "antd";
import { HOME_URL, LOGIN_URL } from "@/config";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "@/api/modules/login";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/modules/user";
import { setAuthMenuList } from "@/redux/modules/auth";
import { modal, message } from "@/hooks/useMessage";
import InfoModal, { InfoModalRef } from "./InfoModal";
import PasswordModal, { PasswordModalRef } from "./PasswordModal";
import avatar from "@/assets/images/avatar.png";

const AvatarIcon: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passRef = useRef<PasswordModalRef>(null);
  const infoRef = useRef<InfoModalRef>(null);

  const logout = () => {
    modal.confirm({
      title: "温馨提示 🧡",
      icon: <ExclamationCircleOutlined />,
      content: "是否确认退出登录？",
      okText: "确认",
      cancelText: "取消",
      maskClosable: true,
      onOk: async () => {
        await logoutApi();
        navigate(LOGIN_URL);
        message.success("退出登录成功！");

        dispatch(setToken(""));
        // Update authMenuList asynchronously to prevent 404 page
        setTimeout(() => dispatch(setAuthMenuList([])));
      }
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span className="dropdown-item">首页</span>,
      icon: <HomeOutlined style={{ fontSize: "14px" }} />,
      onClick: () => navigate(HOME_URL)
    },
    {
      key: "2",
      label: <span className="dropdown-item">个人信息</span>,
      icon: <UserOutlined style={{ fontSize: "14px" }} />,
      onClick: () => infoRef.current?.showModal({ name: "hooks" })
    },
    {
      key: "3",
      label: <span className="dropdown-item">修改密码</span>,
      icon: <FormOutlined style={{ fontSize: "14px" }} />,
      onClick: () => passRef.current?.showModal({ name: "hooks" })
    },
    {
      type: "divider"
    },
    {
      key: "4",
      label: <span className="dropdown-item">退出登录</span>,
      icon: <LoginOutlined style={{ fontSize: "14px" }} />,
      onClick: logout
    }
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottom" arrow>
        <Avatar className="avatar" size={42} src={avatar} />
      </Dropdown>
      <InfoModal ref={infoRef} />
      <PasswordModal ref={passRef} />
    </>
  );
};

export default AvatarIcon;
