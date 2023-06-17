import * as React from "react";
import { changeLanguage as i18nChangeLanguage } from "i18next";
import { listItems } from "../../utils/routes/listItems";
import style from "./sidebar.module.scss";
// Icons Flag
import UzFlag from "../../images/icons/flag-uzbekistan.webp";
import EnFlag from "../../images/icons/enFlag.webp";
import { useTheme } from "../../utils/zustand/useTheme";
import { NavLink } from "react-router-dom";
import { Button, Dropdown } from "antd";
import { MenuProps } from "react-select";
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
  const changeThemeFunction = useTheme((state) => state.changeTheme);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const changeLanguage = (language: string) => {
    const langugeLowercase: string = language.toLowerCase();
    console.log(langugeLowercase);
    if (langugeLowercase === "english") {
      return i18nChangeLanguage("en");
    } else if (langugeLowercase === "uzbek") {
      return i18nChangeLanguage("uz");
    }
  };

  // return (
  //   <header className={style.sidebar}>
  //     <nav className={`${style.sidebarNav}`}>
  //       <div className={style.logo}>
  //         <span onClick={() => (window.location.pathname = "/")}>
  //           WIKI TSUULL
  //         </span>
  //       </div>
  //       <ul className={style.listItems}>
  //         {listItems?.map(({ icon, url, title }, index) => (
  //           <li
  //             id={window.location.pathname == url ? style.activeLink : ""}
  //             onClick={() => (window.location.pathname = url)}
  //             key={index}
  //             className={`${style.listItem} font-mono`}
  //           >
  //             <div id={style.icon}>{icon}</div>
  //             <span id={style.link}>{title}</span>
  //           </li>
  //         ))}
  //       </ul>
  //       <div className={style.Language_themeContainer}>
  //         <div className="lang">
  //           <div className={style.Dropdown}>
  //             <div className={style.DropdownWrapper} onClick={handleOpen}>
  //               <article className={style.DropdownControl}>
  //                 <GlobalOutlined className={style.DropdownBtn} />
  //                 <span>Language</span>
  //               </article>
  //               <article>
  //                 <CaretDownOutlined />
  //               </article>
  //             </div>
  //             {open ? (
  //               <div className={style.DropdownList}>
  //                 {items?.map(({ img, key, label }) => (
  //                   <div
  //                     onClick={() => {
  //                       setOpen(!open);
  //                       changeLanguage(label);
  //                     }}
  //                     className={style.DropdownItem}
  //                     key={key}
  //                   >
  //                     <div className="drob-img">
  //                       <img
  //                         src={img}
  //                         width={70}
  //                         height={70}
  //                         className={style.drobImg}
  //                         alt={label}
  //                       />
  //                     </div>
  //                     <span>{label}</span>
  //                   </div>
  //                 ))}
  //               </div>
  //             ) : null}
  //           </div>
  //         </div>
  //         <div className={style.theme}>
  //           {theme === "light" ? (
  //             <div
  //               onClick={() => changeThemeFunction()}
  //               className={style.lightTheme}
  //             >
  //               <BsFillSunFill />
  //             </div>
  //           ) : (
  //             <div
  //               onClick={() => changeThemeFunction()}
  //               className={style.darkTheme}
  //             >
  //               <BsFillMoonFill />
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </nav>
  //   </header>
  // );
  return (
    <header>
      <nav className={style.navbar}>
        <div className={style.userMe}>
          <h2>John Doe</h2>
          <p>admin</p>
        </div>
        <div className={style.links}>
          {listItems.map((item, index) => (
            <NavLink to={item.url} key={index}>
              {item.title.toUpperCase()}
            </NavLink>
          ))}
          <div className={style.params}>
            <div className={style.languages}>
              <Dropdown
                menu={{
                  items,
                  selectable: true,
                  defaultValue: "uz",
                  defaultSelectedKeys: ["uz"],
                }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <Button type="text">uz</Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
