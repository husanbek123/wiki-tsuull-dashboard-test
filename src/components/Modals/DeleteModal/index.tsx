import { Modal } from "antd";

export function Delete(props: {
  id: number | string;
  setIsModalOpen: (bool: boolean) => void;
  isModalOpen: boolean;
}) {
  const { id, setIsModalOpen, isModalOpen } = props;
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>id {id}</p>
    </Modal>
  );
}
