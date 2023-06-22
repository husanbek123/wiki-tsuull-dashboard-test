/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// useState Hook
import { useState } from "react";
//  Button Table  Image Antd
import { Button, Table } from "antd";
// Crud Navigator
import { CRUDNavigator } from "../../components/CRUDNavigator";
// style
import style from "./index.module.scss";
// TOOLTIP
import TOOLTIP from "../../components/Tooltip";
// React Icons
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { useGetData } from "../../utils/hooks/useGet";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";
import ComponentLoader from "../../components/ComponentLoader";
import { api } from "../../utils/axios";

type image = {
  _id: string;
  path: string;
};

interface WordProps {
  _id: string;
  title_uz: string;
  title_en: string;
  comment_en: string;
  comment_uz: string;
  description_en: string;
  description_uz: string;
  image: image;
}

export default function Words() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalParametrs, setModalParametrs] = useState<{
    status: any;
    id?: any;
    url?: string;
  }>({
    status: null,
    id: null,
  });
  const [_, setDataSource] = useState([]);
  const useGet = useGetData(["word"], "/word", {});
  const [success, setSuccess] = useState<boolean>(false);
  if (useGet.isSuccess && !success) {
    setDataSource(() => useGet.data?.data);
    setSuccess(() => true);
  }
  interface DataType {
    key: any;
  }

  const dataResult: WordProps[] = useGet?.data?.data;
  const { t } = useTranslation();
  // Table Columns
  const columns: ColumnsType<DataType> = [
    { title: t("title_uz"), dataIndex: "title_uz", key: "title_uz" },
    { title: t("title_en"), dataIndex: "title_en", key: "title_uz" },
    { title: "Img", dataIndex: "image" },
    { title: "", dataIndex: "buttons", fixed: "right" },
  ];
  return (
    <div className={style.Main}>
      <div className={style.container}>
        {isModalOpen && (
          <CRUDNavigator
            postUrl={"/word"}
            option={modalParametrs.status}
            id={modalParametrs.id}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            url={""}
          />
        )}
        <div className={style.Add}>
          <TOOLTIP title={"Add"} key={"Add"} color="blue">
            <Button
              type="primary"
              style={{
                width: "100%",
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
                {t("add")} <AiOutlinePlus />
              </p>
            </Button>
          </TOOLTIP>
        </div>

        <div className={style.table}>
          <Table
            className="dark-buttons "
            loading={{
              indicator: (
                <div>
                  <ComponentLoader />
                </div>
              ),
              spinning: !useGet.data?.data,
            }}
            columns={columns}
            dataSource={dataResult?.map((item: WordProps, index: any) => ({
              key: index + 1,
              title_uz: <p>{item?.title_uz}</p>,
              title_en: <p>{item?.title_en}</p>,
              buttons: (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
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

                  <TOOLTIP title={`Single`} color={"green"} key={"3"}>
                    <Button
                      style={{
                        width: "40px",
                        height: "40px",
                        fontSize: "15px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "green",
                        borderColor: "green",
                      }}
                      onClick={() => {
                        setModalParametrs({
                          status: "Single",
                          id: item._id,
                          url: "/phrase",
                        });
                        setIsModalOpen(true);
                      }}
                    >
                      <BsFillEyeFill />
                    </Button>
                  </TOOLTIP>
                </div>
              ),
              image: (
                <>
                  <div>
                    <img
                      width={50}
                      src={`${api}/file/${item?.image?.path}`}
                      alt={"img"}
                    />
                  </div>
                </>
              ),
            }))}
          />
        </div>
      </div>
    </div>
  );
}
