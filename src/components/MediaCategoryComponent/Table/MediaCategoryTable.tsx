import { useGetData } from "../../../utils/hooks/useGet";
import { Table, Button } from "antd";
import TOOLTIP from "../../Tooltip";
interface MediaCategoryProps {
  title_en: string;
  title_uz: string;
  _id: string;
}
const columns = [
  { title: "Title Uzbek", dataIndex: "title_uz", key: "title_uz" },
  { title: "Title English", dataIndex: "title_en", key: "title_uz" },
];

import style from "./MediaCategoryTable.module.scss";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { useState } from "react";
export default function MediaCategoryTable() {
  const { data } = useGetData(["media-category"], "/media-category", {});
  let MediaCategoryResult: MediaCategoryProps[] = data?.data;
  const [modalParametrs, setModalParametrs] = useState<{
    status: any;
    id?: any;
  }>({
    status: null,
    id: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className={style.tableWrapper}>
        <Table
          dataSource={MediaCategoryResult?.map((item, index) => ({
            key: index + 1,
            title_uz: item.title_uz.substring(0, 15) + "...",
            title_en: item.title_uz.substring(0, 15) + "...",
            buttons: (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                <TOOLTIP color="red" title={"Delete"} key={"1"}>
                  <Button
                    style={{
                      width: "40px",
                      height: "40px",
                      color: "red",
                      borderColor: "red",
                      fontSize: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setModalParametrs({
                        status: "Delete",
                        id: item._id,
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <BsFillTrashFill></BsFillTrashFill>
                  </Button>
                </TOOLTIP>
                <TOOLTIP title={`Change`} color={"orange"} key={"2"}>
                  <Button
                    style={{
                      width: "40px",
                      height: "40px",
                      color: "orange",
                      borderColor: "orange",
                      fontSize: "15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setModalParametrs({
                        status: "Update",
                        id: item._id,
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <BsPencilSquare />
                  </Button>
                </TOOLTIP>
              </div>
            ),
          }))}
          columns={columns}
        />
      </div>
    </>
  );
}
