import * as React from "react";
import { ChildrenType } from "../types/defaultType";
import Sidebar from "../components/Sidebar/Sidebar";
import style from "./layout.module.scss";
import { useTheme } from "../utils/zustand/useTheme";
export default function Layout(props: ChildrenType): React.ReactElement {
  const theme = useTheme((state) => state.theme);
  return (
    <section id={theme} className={style.layoutWrapper}>
      <Sidebar />
      <main className={style.page}>{props?.children}</main>
    </section>
  );
}
