import welcome from "@/assets/images/welcome.png";
import "./index.less";

const Home: React.FC = () => {
  return (
    <div className="home card">
      <img src={welcome} className="home-bg" alt="welcome" />
    </div>
  );
};

export default Home;
