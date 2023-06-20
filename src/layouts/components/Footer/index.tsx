import { RootState, useSelector } from "@/redux";
import "./index.less";

const LayoutFooter: React.FC = () => {
  const footer = useSelector((state: RootState) => state.global.footer);

  return (
    <>
      {footer && (
        <div className="footer">
          <a href="http://www.spicyboy.cn/" target="_blank" rel="noreferrer">
            2023 © Hooks-Admin By Hooks Technology.
          </a>
        </div>
      )}
    </>
  );
};

export default LayoutFooter;
