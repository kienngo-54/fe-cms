import { Avatar, Flex, Layout, Typography, theme } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import en from "../../languages/en";
import { menu } from "./Sidebar";
import { useStyle } from "./styles";
import { useAppDispatch, useAppSelector } from "../../redux";
import { clearData } from "../../redux/slices/authSlice";
import { redirectToLogin } from "../../helpers";

const { Header } = Layout;
function AppHeader() {
  const { styles } = useStyle();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((s) => s.auth.storage);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(clearData());
    redirectToLogin();
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        height: 56,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{ padding: "0 36px", height: "100%" }}
      >
        <Typography style={{ fontSize: 14, fontWeight: 500 }}>
          {menu.find((item) => item.key === location.pathname)?.title}
        </Typography>
        <Flex gap={8}>
          <Avatar
            className={styles.avatar}
            style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
            size="large"
          >
            <Typography.Text
              style={{
                fontSize: 20,
                fontWeight: 600,
                margin: 0,
                color: "inherit",
                lineHeight: "normal",
              }}
            >
              {userInfo?.username[0].toUpperCase()}
            </Typography.Text>
          </Avatar>
          <Flex vertical>
            <Typography.Text
              style={{ fontSize: 14, fontWeight: 600, margin: 0 }}
            >
              {userInfo?.username}
            </Typography.Text>
            <Typography.Text
              className={styles.textHover}
              style={{
                fontSize: 12,
                color: "#aaa",
                margin: 0,
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Đăng xuất
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </Header>
  );
}

export default AppHeader;
