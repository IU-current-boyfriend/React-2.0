import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./index.less";

const UseProTable: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="table card">
      <Button
        type="primary"
        onClick={() => navigate(`/proTable/useProTable/detail/${Math.random().toFixed(3)}?params=detail-page`)}
      >
        To ProTable Detail
      </Button>
      <span className="text">我是 ProTable 页面</span>
    </div>
  );
};

export default UseProTable;
