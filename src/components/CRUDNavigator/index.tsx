import { Add } from "../Modals/AddModal";
import { Delete } from "../Modals/DeleteModal";
import { Update } from "../Modals/UpdateModal";

export function CRUDNavigator(props: {
  option: "Add" | "Delete" | "Update";
  id: string | number;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  postUrl: "/media" | "/phrase" | "/word" | "/media-category";
}) {
  const { option, id, setIsModalOpen } = props;
  if (option === "Update") {
    return (
      <Update
        postUrl={props.postUrl}
        isModalOpen
        setIsModalOpen={setIsModalOpen}
        id={id}
      ></Update>
    );
  } else if (option == "Delete") {
    return (
      <Delete
        postUrl={props.postUrl}
        isModalOpen
        setIsModalOpen={setIsModalOpen}
        id={id}
      ></Delete>
    );
  }
  return (
    <Add
      postUrl={props.postUrl}
      isModalOpen
      setIsModalOpen={setIsModalOpen}
    ></Add>
  );
}
