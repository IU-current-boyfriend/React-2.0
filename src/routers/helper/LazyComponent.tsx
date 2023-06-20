import React, { Suspense } from "react";
import { Spin } from "antd";

/**
 * @description Routing lazy loading
 * @param {Element} Comp Components that need to be accessed
 * @returns React.ReactNode
 */
const LazyComponent = (Comp: React.LazyExoticComponent<React.ComponentType>) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  };

  return (
    <Suspense fallback={<Spin size="large" style={style} />}>
      <Comp />
    </Suspense>
  );
};

export default LazyComponent;
