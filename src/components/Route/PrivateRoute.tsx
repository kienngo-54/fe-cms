import React, { PropsWithChildren, useEffect } from "react";
import { useAppSelector } from "../../redux";
import { Navigate } from "react-router-dom";
import ROUTE from "../../constants/routes";
import AppLayout from "../Layout";
import { redirectToLogin } from "../../helpers";

interface PrivateRouteProps {
  title: string;
}

function PrivateRoute(props: PropsWithChildren<PrivateRouteProps>) {
  const { title, children } = props;

  const isLogin = useAppSelector((s) => s.auth.authenticated);

  useEffect(() => {
    console.log(123);
    document.title = title;
  }, []);

  if (!isLogin) {
    redirectToLogin();
    return null;
  }

  return <AppLayout>{children}</AppLayout>;
}

export default PrivateRoute;
