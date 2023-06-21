import * as React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { useTheme } from "../utils/zustand/useTheme";
import { useLocation } from "react-router-dom";
export default function Layout(props: {
  children: React.ReactNode;
}): React.ReactElement {
  const theme = useTheme((state) => state.theme);
  document.querySelector("body")?.setAttribute("data-theme", theme);
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && <Sidebar />}

      <div>{props?.children}</div>
    </>
  );
}
