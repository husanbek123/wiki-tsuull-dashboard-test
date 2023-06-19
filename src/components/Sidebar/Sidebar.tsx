import { changeLanguage } from "i18next";
import { listItems } from "../../utils/routes/listItems";
import style from "./sidebar.module.scss";
import { useTheme } from "../../utils/zustand/useTheme";
import { NavLink } from "react-router-dom";
import { Dropdown } from "antd";
import { useLanguage } from "../../utils/zustand/useLanguage";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { t } from "i18next";
import { useToken } from "../../utils/zustand/useStore";
import uzImg from "../../images/icons/flag-uzbekistan.webp";
import enImg from "../../images/icons/enFlag.webp";
import { MdLanguage } from "react-icons/md";
const items = [
  {
    key: "uz",
    label: <img style={{margin: "10px 0"}} src={uzImg} width={70} alt="uz-img" />,
  },
  {
    key: "en",
    label: <img src={enImg} width={70} alt="en-img" />,
  },
];
export default function Sidebar() {
  let theme = useTheme((state) => state.theme);
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
              {t(item.title)}
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
              <MdLanguage size={40} />
            </Dropdown>
          </div>
          <div className={style.theme}>
            {theme === "light" ? (
              <div className={style.ThemContainerSun}>
                <BsFillSunFill className={style.SunIcon} onClick={setTheme} />
              </div>
            ) : (
              <div className={style.ThemeContainerMoon}>
                <BsFillMoonFill className={style.MoonIcon} onClick={setTheme} />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
