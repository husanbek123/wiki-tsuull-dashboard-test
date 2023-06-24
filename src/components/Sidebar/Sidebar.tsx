import { listItemType } from "../../types/defaultType";
import { listItems } from "../../utils/routes/listItems";
import React from "react";
// BootstrapIcons
import { BsArrowLeftShort } from "react-icons/bs";
import { FiBookOpen } from "react-icons/fi";
// List Items
// RiDashbord Icon
import { RiDashboardFill } from "react-icons/ri";
// listItamsType
type Props = {};
function Sidebar({}: Props) {
  // Open State
  const [open, setOpen] = React.useState<boolean>(true);
  // Toggle Function for Change Open State
  const toggle = () => setOpen((prew) => !prew);
  return (
    <div
      className={`bg-dark-purple h-screen  duration-300 p-5 pt-8 ${
        open ? "w-72" : "w-60"
      } relative`}
    >
      {/* Logo */}
      <div id="p-logo" className="flex my-3 items-center gap-5" role="banner">
        <span>
          <FiBookOpen className={`text-white text-[30px] ${!open && "text-[40px]"}`} />
        </span>
        <a
          className={`text-white text-[26px] duration-200 ${
            !open && "scale-0"
          }`}
          href="/"
          title="Visit the main page"
        >
         Edu Finder
        </a>
      </div>
      {/* Change  Icon*/}
      <BsArrowLeftShort
        onClick={toggle}
        className={`bg-white text-dark-purple text-3xl rounded-full absolute border-2  cursor-pointer  border-dark-purple -right-3 top-9 ${
          !open && "rotate-180"
        }`}
      />

      {listItems?.map((item: listItemType, id) => {
        return (
          <ul key={id} className="pt-4">
            <li
              className="cursor-pointer p-2 flex items-center gap-3 text-gray-300 rounded duration-300 hover:bg-light-white"
              onClick={() => (window.location.pathname = item?.url)}
            >
              <RiDashboardFill className="text-2xl" />
              <p> {item?.title}</p>
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default Sidebar;
