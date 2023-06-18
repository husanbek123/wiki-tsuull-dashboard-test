import { changeLanguage } from "i18next";
import { listItems } from "../../utils/routes/listItems";
import style from "./sidebar.module.scss";
import { useTheme } from "../../utils/zustand/useTheme";
import { NavLink } from "react-router-dom";
import { Button, Dropdown, Switch } from "antd";
import { useLanguage } from "../../utils/zustand/useLanguage";
import { useToken } from "../../utils/zustand/useStore";
import { t } from "i18next";
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
  const setTheme = useTheme((state) => state.setTheme);
  const language = useLanguage((state) => state.langauge);
  const setLanguage = useLanguage((state) => state.setLangauge);
  const name = useToken((state) => state.name);
  if (language === "uz") {
    changeLanguage("uz");
  } else {
    changeLanguage("en");
  }

  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <div className={style.userMe}>
          <div className={style.ProfilePhoto}>{name?.[0]}</div>
          <div className={style.userTitles}>
            <h2>{name}</h2>
            <p>admin</p>
          </div>
        </div>
        <div className={style.links}>
          {listItems.map((item, index) => (
            <NavLink to={`${item.url}`} key={index}>
              {/* {item.title.toUpperCase()} */}
              {item.title === "Media" ? t("Media") : null}
              {item.title === "Meadia category" ? t("MediaCategory") : null}
              {item.title === "Phrase" ? t("Phrase") : null}
              {item.title === "Words" ? t("Words") : null}
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
              <Button>{language}</Button>
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
