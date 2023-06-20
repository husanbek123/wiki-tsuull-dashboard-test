import * as React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { useTheme } from "../utils/zustand/useTheme";
export default function Layout(props: {
  children: React.ReactNode;
}): React.ReactElement {
  const theme = useTheme((state) => state.theme);
  document.querySelector("body")?.setAttribute("data-theme", theme);
  return (
    <>
      <Sidebar />
      <div>{props?.children}</div>
    </>
  );
}
