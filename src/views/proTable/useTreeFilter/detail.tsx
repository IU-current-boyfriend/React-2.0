import { useLocation, useParams } from "react-router-dom";
import "./index.less";

const UseTreeFilterDetail: React.FC = () => {
  let { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("params");

  return (
    <div className="table card">
      <span className="text"> 我是 TreeFilter 详情页，和 TreeFilter 是同一级路由</span>
      <span className="text">params ：{id}</span>
      <span className="text">query ：{query}</span>
    </div>
  );
};

export default UseTreeFilterDetail;
