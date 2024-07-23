import React, { useEffect, useState } from "react";
import { Login } from "@/api/interface";
import { HOME_URL } from "@/config";
import { getTimeState } from "@/utils";
import { useDispatch } from "@/redux";
import { setToken } from "@/redux/modules/user";
import { setTabsList } from "@/redux/modules/tabs";
import { fetchMenuList } from "@/redux/modules/auth";
import { notification } from "@/hooks/useMessage";
import { Button, Form, Input } from "antd";
import type { FormInstance, FormProps } from "antd/es/form";
import { loginApi } from "@/api/modules/login";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, CloseCircleOutlined, CheckCircleFilled } from "@ant-design/icons";
import md5 from "js-md5";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = React.useRef<FormInstance>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Login.ReqLoginForm) => {
    try {
      setLoading(true);
      // 1.login
      const { data } = await loginApi({ ...values, password: md5(values.password) });
      dispatch(setToken(data.access_token));

      // clear tabs Data
      dispatch(setTabsList([]));

      // 请求带有权限的菜单列表
      try {
        const payload = await dispatch(fetchMenuList()).unwrap();
        // 不存在数据的话，直接返回
        if (!payload.length) return;
      } catch (error) {
        dispatch(setToken(""));
        return;
      }

      notification.success({
        message: getTimeState(),
        description: "欢迎登录 Hooks-Admin",
        icon: <CheckCircleFilled style={{ color: "#73d13d" }} />
      });
      navigate(HOME_URL);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  useEffect(() => {
    document.onkeydown = e => {
      if (e.code === "Enter") {
        e.preventDefault();
        formRef.current?.submit();
      }
    };
    return () => {
      document.onkeydown = () => {};
    };
  }, []);
  return (
    <div className="login-form-content">
      <Form name="login" size="large" autoComplete="off" ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input prefix={<UserOutlined />} placeholder="User：admin / user" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password：123456" />
        </Form.Item>
        <Form.Item className="login-form-button">
          <Button shape="round" icon={<CloseCircleOutlined />} onClick={onReset}>
            Reset
          </Button>
          <Button type="primary" shape="round" icon={<UserOutlined />} loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
