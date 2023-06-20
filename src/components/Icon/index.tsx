import { createFromIconfontCN } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";
import React from "react";

interface IconProps {
  name: string;
}

export const Icon: React.FC<IconProps> = ({ name }) => {
  const customIcons: { [key: string]: any } = Icons;
  return React.createElement(customIcons[name]);
};

export const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/c/font_3878708_mmx4qpps1zh.js"]
});
