import * as React from "react";
import { ChildrenType } from "../types/defaultType";
import Sidebar from "../components/Sidebar/Sidebar";
import style from "./layout.module.scss"
export default function Layout(props: ChildrenType): React.ReactElement {
  return (
    <section className={style.layoutWrapper}>
      <Sidebar />
      {props?.children}
    </section>
  );
}
