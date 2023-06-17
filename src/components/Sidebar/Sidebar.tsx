import * as React from "react";
import { changeLanguage as i18nChangeLanguage } from "i18next";
import { listItems } from "../../utils/routes/listItems";
import style from "./sidebar.module.scss";

import { useTheme } from "../../utils/zustand/useTheme";
import { NavLink } from "react-router-dom";
import { Button, Dropdown, Switch } from "antd";
import { useLanguage } from "../../utils/zustand/useLanguage";
const items = [
  {
    key: "uz",
    label: <p>uz</p>,
  },
  {
    key: "en",
    label: <p>en</p>,
  },
];
export default function Sidebar() {
  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);
  const language = useLanguage((state) => state.langauge);
  const setLanguage = useLanguage((state) => state.setLangauge);
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <div className={style.userMe}>
          <div className={style.ProfilePhoto}></div>
          <div className={style.userTitles}>
            <h2>John Doe</h2>
            <p>admin</p>
          </div>
        </div>
        <div className={style.links}>
          {listItems.map((item, index) => (
            <NavLink to={`${item.url}`} key={index}>
              {item.title.toUpperCase()}
            </NavLink>
          ))}
        </div>
        <div className={style.params}>
          <div className={style.languages}>
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultValue: language,
                defaultSelectedKeys: [language],
                onSelect: (e) => setLanguage(e.key),
              }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <Button >{language}</Button>
            </Dropdown>
          </div>
          <div className={style.theme}>
            <Switch
              defaultChecked
              onChange={(e) => setTheme(e ? "dark" : "light")}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
