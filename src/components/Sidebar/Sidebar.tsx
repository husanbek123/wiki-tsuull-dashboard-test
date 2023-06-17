import * as React from "react";
import { changeLanguage as i18nChangeLanguage } from "i18next";
import { listItems } from "../../utils/routes/listItems";
import { CaretDownOutlined, GlobalOutlined } from "@ant-design/icons";
import { LanguageItemsProps } from "../../types/defaultType";
import style from "./sidebar.module.scss";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
// Icons Flag
import UzFlag from "../../images/icons/flag-uzbekistan.webp";
import EnFlag from "../../images/icons/enFlag.webp";
import { useTheme } from "../../utils/zustand/useTheme";
const items: LanguageItemsProps[] = [
  {
    key: "1",
    label: "Uzbek",
    img: UzFlag,
  },
  {
    key: "2",
    label: "English",
    img: EnFlag,
  },
];
export default function Sidebar() {
  const theme = useTheme((state) => state.theme);
  const changeThemeFunction = useTheme((state) => state.changeTheme);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const changeLanguage = (language: string) => {
    let langugeLowercase = language.toLowerCase();
    console.log(langugeLowercase);
    if (langugeLowercase === "english") {
      return i18nChangeLanguage("en");
    } else if (langugeLowercase === "uzbek") {
      return i18nChangeLanguage("uz");
    }
  };

  
  return (
    <header className={style.sidebar}>
      <nav className={`${style.sidebarNav}`}>
        <div className={style.logo}>
          <span onClick={() => (window.location.pathname = "/")}>
            WIKI TSUULL
          </span>
        </div>
        <ul className={style.listItems}>
          {listItems?.map(({ icon, url, title }, index) => (
            <li
              id={window.location.pathname == url ? style.activeLink : ""}
              onClick={() => (window.location.pathname = url)}
              key={index}
              className={`${style.listItem} font-mono`}
            >
              <div id={style.icon}>{icon}</div>
              <span id={style.link}>{title}</span>
            </li>
          ))}
        </ul>
        <div className={style.Language_themeContainer}>
          <div className="lang">
            <div className={style.Dropdown}>
              <div className={style.DropdownWrapper} onClick={handleOpen}>
                <article className={style.DropdownControl}>
                  <GlobalOutlined className={style.DropdownBtn} />
                  <span>Language</span>
                </article>
                <article>
                  <CaretDownOutlined />
                </article>
              </div>
              {open ? (
                <div className={style.DropdownList}>
                  {items?.map(({ img, key, label }) => (
                    <div  onClick={() => {
                      setOpen(!open);
                      changeLanguage(label)
                    }} className={style.DropdownItem} key={key}>
                      <div  className="drob-img">
                        <img
                          src={img}
                          width={70}
                          height={70}
                          className={style.drobImg}
                          alt={label}
                        />
                      </div>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className={style.theme}>
            {theme === "light" ? (
              <div
                onClick={() => changeThemeFunction()}
                className={style.lightTheme}
              >
                <BsFillSunFill />
              </div>
            ) : (
              <div
                onClick={() => changeThemeFunction()}
                className={style.darkTheme}
              >
                <BsFillMoonFill />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

