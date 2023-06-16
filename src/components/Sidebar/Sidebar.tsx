import style from "./sidebar.module.scss";
import { listItems } from "../../utils/routes/listItems";
export default function Sidebar() {
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
              className={style.listItem}
            >
              <div id={style.icon}>{icon}</div>
              <span id={style.link}>{title}</span>
            </li>
          ))}
        </ul>
        <div className="lang-container">
        </div>
      </nav>
    </header>
  );
}