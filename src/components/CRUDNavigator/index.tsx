import { Add } from "../AddModal";
import { Delete } from "../DeleteModal";
import { Update } from "../UpdateModal";

export function CRUDNavigator(
  option: "Add" | "Delete" | "Update",
  id: string | number
) {
  if (option === "Update") {
    return <Update id={id}></Update>;
  } else if (option == "Delete") {
    return <Delete id={id}></Delete>;
  }
  return <Add id={id}></Add>;
}
