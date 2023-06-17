import * as React from "react";
import { ChildrenType } from "../types/defaultType";
import Sidebar from "../components/Sidebar/Sidebar";
import style from "./layout.module.scss";
import { useTheme } from "../utils/zustand/useTheme";
export default function Layout(props: {
  children: React.ReactNode;
}): React.ReactElement {
  const theme = useTheme((state) => state.theme);
  return (
    <div id={theme} className={style.layoutWrapper}>
      <Sidebar />
      <div className={style.page}>{props?.children}</div>
    </div>
  );
}
