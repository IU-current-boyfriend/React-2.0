import { Dropdown, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { IconFont } from "@/components/Icon";
import { ReloadOutlined, ExpandOutlined, CloseCircleOutlined, ColumnWidthOutlined, SwitcherOutlined } from "@ant-design/icons";

const MoreButton: React.FC = () => {
  const { t } = useTranslation();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>{t("tabs.refresh")}</span>,
      icon: <ReloadOutlined style={{ fontSize: "14px" }} />
    },
    {
      key: "2",
      label: <span>{t("tabs.maximize")}</span>,
      icon: <ExpandOutlined style={{ fontSize: "14px" }} />
    },
    {
      type: "divider"
    },
    {
      key: "3",
      label: <span>{t("tabs.closeCurrent")}</span>,
      icon: <CloseCircleOutlined style={{ fontSize: "14px" }} />
    },
    {
      key: "4",
      label: <span>{t("tabs.closeOther")}</span>,
      icon: <ColumnWidthOutlined style={{ fontSize: "14px" }} />
    },
    {
      key: "5",
      label: <span>{t("tabs.closeAll")}</span>,
      icon: <SwitcherOutlined style={{ fontSize: "14px" }} />
    }
  ];

  return (
    <div className="more-button">
      <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={["click"]}>
        <div className="more-button-item">
          <IconFont style={{ fontSize: 22 }} type="icon-xiala" />
        </div>
      </Dropdown>
    </div>
  );
};

export default MoreButton;
