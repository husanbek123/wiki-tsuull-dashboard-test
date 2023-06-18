import { Modal } from "antd";
import { useDelete } from "../../../utils/hooks/useDelete";
import SuccessToastify from "../../toastify/Success";
import { useQueryClient } from "@tanstack/react-query";
import ErrorToastify from "../../toastify/Error";
import { postUrl } from "../../../types/defaultType";

export function Delete(props: {
  id: number | string;
  setIsModalOpen: (bool: boolean) => void;
  isModalOpen: boolean;
  postUrl: postUrl;
}) {
  const { id, setIsModalOpen, isModalOpen, postUrl } = props;
  const useDeleteData = useDelete(`${props.postUrl}`);
  const queryClient = useQueryClient();


  const handleOk = () => {
    useDeleteData.mutate(`${id}`, {
      onSuccess: () => {
        SuccessToastify("Deleted!");
<<<<<<< HEAD
        queryClient.invalidateQueries({ queryKey: validateQuery });
=======
        queryClient.invalidateQueries({
          queryKey: [`${postUrl.slice(1)}`],
        });
>>>>>>> c8e13947e49ae4ed0cf423c9b439efdf671d5928
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
