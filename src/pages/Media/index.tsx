import { Button, Input, Table } from "antd";
import { useGetData } from "../../utils/hooks/useGet";
import styles from "./index.module.scss";
import parse from "html-react-parser";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import TOOLTIP from "../../components/Tooltip";
import { useState } from "react";
import { InputTableFilter } from "../../components/Inputs/InputTableFilter";
import { CRUDNavigator } from "../../components/CRUDNavigator";
const dataCRUDname = "media";

const columns = [
  { title: "TITLE UZ", dataIndex: "title_uz", key: "title_uz" },
  { title: "TITLE EN", dataIndex: "title_en", key: "title_uz" },
  { title: "FRAME", dataIndex: "frame", key: "frame" },
  { title: "CATEGORY UZ", dataIndex: "category_uz", key: "category_uz" },
  { title: "CATEGORY EN", dataIndex: "category_en", key: "category_uz" },
  {
    title: "",
    dataIndex: "buttons",
    key: "buttons",
  },
];

export default function Media() {
  const useGet = useGetData([dataCRUDname], `/${dataCRUDname}`, {});
  const [success, setSuccess] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalParametrs, setModalParametrs] = useState<{
    status: any;
    id?: any;
  }>({
    status: null,
    id: null,
  });

  if (useGet.isSuccess && !success) {
    setDataSource(() => useGet.data.data);
    setSuccess(() => true);
  }

  return (
    <div className={styles.Main}>
      <div className={styles.container}>
        {isModalOpen && (
          <CRUDNavigator
            option={modalParametrs.status}
            id={modalParametrs.id}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        )}
        <div className={styles.Add}>
          <InputTableFilter
            value={value}
            setValue={setValue}
            setDataSource={setDataSource}
            zaprosData={useGet?.data?.data}
          ></InputTableFilter>
          <TOOLTIP title={"Add"} key={"Add"} color="blue">
            <Button
              type="primary"
              style={{
                width: "100px",
                height: "40px",

                fontSize: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setModalParametrs({
                  status: "Add",
                });
                setIsModalOpen(true);
              }}
            >
              <p>
                Add <AiOutlinePlus />
              </p>
            </Button>
          </TOOLTIP>
        </div>
        <div className={styles.table}>
          <Table
            columns={columns}
            // locale={{ emptyText: "xxx" }}
            dataSource={dataSource.map((item: any, index: any) => ({
              key: index + 1,
              title_uz: item.title_uz.substring(0, 15) + "...",
              title_en: item.title_uz.substring(0, 15) + "...",
              // frame: (
              //   <div
              //     style={{
              //       width: "40px",
              //       height: "40px",
              //     }}
              //   >
              //     {parse(item.frame)}
              //   </div>
              // ),
              category_uz: (
                <div>
                  {useGet.data?.data[index]?.category?.map(
                    (item: any, index: any) => (
                      <p key={index}>
                        {item.title_uz.substring(0, 15) + "..."}
                      </p>
                    )
                  )}
                </div>
              ),
              category_en: (
                <div>
                  {useGet.data?.data[index]?.category?.map(
                    (item: any, index: any) => (
                      <p key={index}>
                        {item.title_en.substring(0, 15) + "..."}
                      </p>
                    )
                  )}
                </div>
              ),
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
          />
        </div>
      </div>
    </div>
  );
}
