import { useLocation, useParams } from "react-router-dom";
import "./index.less";

const UseProTableDetail: React.FC = () => {
  let { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("params");

  return (
    <div className="table card">
      <span className="text"> 我是 ProTable 详情页，属于 ProTable 下面的子集</span>
      <span className="text">params ：{id}</span>
      <span className="text">query ：{query}</span>
    </div>
  );
};

export default UseProTableDetail;
