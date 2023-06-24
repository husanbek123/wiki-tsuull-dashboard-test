/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useGetData } from "../../../utils/hooks/useGet";
import parse from "html-react-parser";
export function Frame(props: {
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
}) {
  const { id, isModalOpen, setIsModalOpen } = props;
  const useGet = useGetData(["media"], `/media`);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const data = useGet?.data?.data?.find((i: any) => i._id == id).frame;

  return (
    <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data ? parse(data) : <h1>No data</h1>}
      </div>
    </Modal>
  );
}
