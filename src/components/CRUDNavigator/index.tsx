import { Add } from "../Modals/AddModal";
import { Delete } from "../Modals/DeleteModal";
import { Update } from "../Modals/UpdateModal";

export function CRUDNavigator(props: {
  option: "Add" | "Delete" | "Update";
  id: string | number;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
}) {
  const { option, id,setIsModalOpen } = props;
  if (option === "Update") {
    return <Update isModalOpen setIsModalOpen={setIsModalOpen} id={id}></Update>;
  } else if (option == "Delete") {
    return <Delete isModalOpen setIsModalOpen={setIsModalOpen} id={id}></Delete>;
  }
  return <Add isModalOpen setIsModalOpen={setIsModalOpen} id={id}></Add>;
}
