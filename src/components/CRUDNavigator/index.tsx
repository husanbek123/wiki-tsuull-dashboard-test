import { postUrl } from "../../types/defaultType";
import { Add } from "../Modals/AddModal";
import { Delete } from "../Modals/DeleteModal";
import { Frame } from "../Modals/Frame";
import { Single } from "../Modals/SingleModal";
import { Update } from "../Modals/UpdateModal";

export function CRUDNavigator(props: {
  option: "Add" | "Delete" | "Update" | "Single" | "Frame";
  id: string | number;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  postUrl: postUrl;
  url: string;
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
  } else if (option == "Single") {
    return (
      <Single
        id={props.id.toString()}
        url={props.postUrl}
        isModalOpen
        setIsModalOpen={setIsModalOpen}
      ></Single>
    );
  } else if (option == "Frame") {
    return (
      <Frame isModalOpen setIsModalOpen={setIsModalOpen} id={`${id}`}></Frame>
    );
  }
  return (
    <Add
      id={`${id}`}
      postUrl={props.postUrl}
      isModalOpen
      setIsModalOpen={setIsModalOpen}
    ></Add>
  );
}
