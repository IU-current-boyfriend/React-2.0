import { RootState, useSelector } from "@/redux";
import LayoutVertical from "./LayoutVertical";
import LayoutClassic from "./LayoutClassic";
import LayoutTransverse from "./LayoutTransverse";
import LayoutColumns from "./LayoutColumns";
import ThemeDrawer from "@/layouts/components/ThemeDrawer";

const LayoutIndex: React.FC = () => {
  const layout = useSelector((state: RootState) => state.global.layout);

  const LayoutComponents = {
    vertical: <LayoutVertical />,
    classic: <LayoutClassic />,
    transverse: <LayoutTransverse />,
    columns: <LayoutColumns />
  };

  return (
    <>
      {LayoutComponents[layout]}
      <ThemeDrawer />
    </>
  );
};

export default LayoutIndex;
