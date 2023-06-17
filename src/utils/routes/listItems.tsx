// Список мне нужны иконки
import {GiHamburgerMenu} from "react-icons/gi"
import { listItemType } from "../../types/defaultType";
// данные ListItems
export const listItems: listItemType[] = [
  {
    icon: <GiHamburgerMenu />,
    url: "/",
    title: "Meadia",
  },
  {
    icon: <GiHamburgerMenu />,
    url: "/media-category",
    title: "Meadia-Category",
  },
  {
    icon: <GiHamburgerMenu />,
    url: "/pharse",
    title: "Pharse",
  },
  {
    icon: <GiHamburgerMenu />,
    url: "/words",
    title: "Words",
  },
];
