import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./index.less";

const UseTreeFilter: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="table card">
      <Button type="primary" onClick={() => navigate("/proTable/useTreeFilter/detail/123?params=detail-page")}>
        To TreeFilter Detail
      </Button>
      <span className="text">我是 TreeFilter 页面</span>
    </div>
  );
};

export default UseTreeFilter;
