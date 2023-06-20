import React, { useEffect, useState } from "react";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { RootState, useSelector } from "@/redux";
import { MetaProps } from "@/routers/interface";
import { useMatches } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { HOME_URL } from "@/config";
import { Breadcrumb } from "antd";

const BreadcrumbNav: React.FC = () => {
  const matches = useMatches();
  const [breadcrumbList, setBreadcrumbList] = useState<ItemType[]>([]);
  const breadcrumbAllList = useSelector((state: RootState) => state.auth.breadcrumbAllList);
  const { breadcrumb, breadcrumbIcon } = useSelector((state: RootState) => state.global);

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    if (meta?.key) {
      let breadcrumbList = breadcrumbAllList[meta.key] || [];
      // You don’t need breadcrumbs on the home page, you can delete the following judgments
      if (breadcrumbList[0]?.path !== HOME_URL) {
        breadcrumbList = [{ path: HOME_URL, meta: { icon: "HomeOutlined", title: "首页" } }, ...breadcrumbList];
      }
      setBreadcrumbList(
        breadcrumbList.map(item => {
          return {
            title: (
              <>
                {breadcrumbIcon && <Icon name={item.meta!.icon!} />}
                <span>{item.meta!.title}</span>
              </>
            )
          };
        })
      );
    }
  }, [matches]);

  return <>{breadcrumb && <Breadcrumb items={breadcrumbList}></Breadcrumb>}</>;
};

export default BreadcrumbNav;
