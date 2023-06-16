import { Modal } from "antd";

export function Update(props: {
  id: string | number;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
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
