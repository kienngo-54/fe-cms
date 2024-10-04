import React, { PropsWithChildren, useEffect } from "react";
import AppLayout from "../Layout";

interface PublicRouteProps {
  title: string;
}

function PublicRoute(props: PropsWithChildren<PublicRouteProps>) {
  const { title, children } = props;

  useEffect(() => {
    document.title = title;
  }, []);

  return <>{children}</>;
}

export default PublicRoute;
