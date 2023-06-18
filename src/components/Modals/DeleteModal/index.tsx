import { Modal } from "antd";
import { useDelete } from "../../../utils/hooks/useDelete";
import SuccessToastify from "../../toastify/Success";
import { useQueryClient } from "@tanstack/react-query";
import ErrorToastify from "../../toastify/Error";

export function Delete(props: {
  id: number | string;
  setIsModalOpen: (bool: boolean) => void;
  isModalOpen: boolean;
  postUrl: "/media" | "/phrase" | "/word" | "/media-category";
}) {
  const { id, setIsModalOpen, isModalOpen, postUrl } = props;
  const useDeleteData = useDelete(`${props.postUrl}`);
  const queryClient = useQueryClient();
  let validateQuery = [`${postUrl.slice(1)}`];
  const handleOk = () => {
    useDeleteData.mutate(`${id}`, {
      onSuccess: () => {
        SuccessToastify("Deleted!");
        queryClient.invalidateQueries({ queryKey: [validateQuery] });
        setIsModalOpen(false);
      },
      onError: () => ErrorToastify("Not deleted"),
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Do you want delete this ?"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    ></Modal>
  );
}
