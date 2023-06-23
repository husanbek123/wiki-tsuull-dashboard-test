import { Modal } from "antd";
import { useDelete } from "../../../utils/hooks/useDelete";
import SuccessToastify from "../../toastify/Success";
import { useQueryClient } from "@tanstack/react-query";
import ErrorToastify from "../../toastify/Error";
import { postUrl } from "../../../types/defaultType";
import { useTranslation } from "react-i18next";

export function Delete(props: {
  id: number | string;
  setIsModalOpen: (bool: boolean) => void;
  isModalOpen: boolean;
  postUrl: postUrl;
}) {
  const { t } = useTranslation();
  const { id, setIsModalOpen, isModalOpen, postUrl } = props;
  const useDeleteData = useDelete(`${props.postUrl}`);
  const queryClient = useQueryClient();
  const handleOk = () => {
    useDeleteData.mutate(`${id}`, {
      onSuccess: () => {
        SuccessToastify("Deleted!");
        queryClient.invalidateQueries({
          queryKey: [`${postUrl.slice(1)}`],
        });
        setIsModalOpen(false);
      },
      onError: () => ErrorToastify("Not deleted"),
    });
    return;
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      width={400}
      title={t("deleteThis")}
      open={isModalOpen}
      onOk={handleOk}
      okButtonProps={{ style: { width: "100%" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={handleCancel}
    ></Modal>
  );
}
