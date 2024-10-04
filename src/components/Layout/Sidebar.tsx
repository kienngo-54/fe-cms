import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import ROUTE from "../../constants/routes";
import { Flex, Image, Menu, MenuProps } from "antd";
import IMAGES from "../../constants/images";
import {
  CalendarOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const menu = [
  {
    title: "Dashboard",
    key: ROUTE.HOME,
    icon: <DashboardOutlined />,
  },
  {
    title: "Quản lý booking",
    key: ROUTE.BOOKING,
    icon: <CalendarOutlined />,
  },
  {
    title: "Quản lý sân",
    key: ROUTE.FIELD,
    icon: <EnvironmentOutlined />,
  },
  {
    title: "Quản lý người dùng",
    key: ROUTE.USER,
    icon: <UserOutlined />,
  },
  {
    title: "Quản lý đội",
    key: ROUTE.TEAM,
    icon: <TeamOutlined />,
  },
  {
    title: "Quản lý khuyến mãi",
    key: ROUTE.PROMOTION,
    icon: <GiftOutlined />,
  },
];

const items: MenuItem[] = menu.map((item) =>
  getItem(item.title, item.key, item.icon)
);

function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
    >
      <Flex justify="center" style={{ padding: 16 }}>
        {collapsed ? (
          <Image preview={false} src={IMAGES.short_logo} height={32} />
        ) : (
          <Image
            preview={false}
            src={IMAGES.full_logo_horizontal}
            height={32}
          />
        )}
      </Flex>
      <Menu
        theme="dark"
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        onClick={({ key }) => {
          navigate(key);
        }}
        items={items}
      />
    </Sider>
  );
}

export default AppSidebar;
