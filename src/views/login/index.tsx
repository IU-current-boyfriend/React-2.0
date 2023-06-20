import LoginForm from "./components/LoginForm";
import SwitchDark from "@/components/SwitchDark";
import loginLeft from "@/assets/images/login_left.png";
import logo from "@/assets/images/logo.svg";
import "./index.less";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-main">
        <SwitchDark />
        <div className="login-illustration">
          <img src={loginLeft} alt="illustration" />
        </div>
        <div className="login-form">
          <div className="login-form-title">
            <img className="login-title-logo" src={logo} alt="logo" />
            <span className="login-title-text">Hooks-Admin</span>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
