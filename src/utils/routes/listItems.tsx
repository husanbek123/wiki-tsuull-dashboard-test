// Список мне нужны иконки
import { SiVlcmediaplayer } from "react-icons/si";
import { DiHtml5Multimedia } from "react-icons/di";
import { BsFillDatabaseFill } from "react-icons/bs";
import { BiData } from "react-icons/bi";
import { listItemType } from "../../types/defaultType";
// данные ListItems
export const listItems: listItemType[] = [
  {
    icon: <SiVlcmediaplayer />,
    url: "/",
    title: "Meadia",
  },
  {
    icon: <DiHtml5Multimedia />,
    url: "/media-category",
    title: "Meadia-Category",
  },
  {
    icon: <BsFillDatabaseFill />,
    url: "/pharse",
    title: "Pharse",
  },
  {
    icon: <BiData />,
    url: "/words",
    title: "Words",
  },
];
