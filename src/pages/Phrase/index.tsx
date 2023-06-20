/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Table } from "antd";
import { useGetData } from "../../utils/hooks/useGet";
import styles from "./index.module.scss";
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import TOOLTIP from "../../components/Tooltip";
import { useState } from "react";
import { CRUDNavigator } from "../../components/CRUDNavigator";
import { ColumnsType } from "antd/es/table";
import parse from "html-react-parser";
import { useLanguage } from "../../utils/zustand/useLanguage";
import { useTranslation } from "react-i18next";
import ComponentLoader from "../../components/ComponentLoader";
interface DataType {
  key: React.Key;
  title: string;
}
export default function Phrase() {
  const useGet = useGetData(["phrase"], `/phrase`, {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalParametrs, setModalParametrs] = useState<{
    status: any;
    id?: any;
    url?: string;
  }>({
    status: null,
    id: null,
  });

  const { t } = useTranslation();
  // Table data
  const columns: ColumnsType<DataType> = [
    { title: t("title_uz"), dataIndex: "title_uz", key: "title_uz" },
    { title: t("title_en"), dataIndex: "title_en", key: "title_uz" },
    { title: t("writers"), dataIndex: "writers", key: "writers" },
    {
      title: t("informations"),
      dataIndex: "informations",
      key: "informations",
    },
    {
      title: "",
      dataIndex: "buttons",
      key: "buttons",
      fixed: "right",
    },
  ];

  const language = useLanguage((state) => state.langauge);
  return (
    <>
      <div className={styles.Main}>
        {isModalOpen && (
          <CRUDNavigator
            postUrl={"/phrase"}
            option={modalParametrs.status}
            id={modalParametrs.id}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            url={`${modalParametrs.url}`}
          />
        )}
        <div className={styles.container}>
          <div className={styles.Add}>
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
          <div className={styles.table}>
            <Table
              scroll={{ x: 1500 }}
              loading={{
                indicator: (
                  <div>
                    <ComponentLoader />
                  </div>
                ),
                spinning: !useGet.data?.data,
              }}
              columns={columns}
              dataSource={useGet.data?.data.map((item: any, index: any) => ({
                key: `${index + 1}`,
                title_uz: <p>{item.title_uz}</p>,
                title_en: <p>{item.title_en}</p>,
                description_uz: <div>{parse(item.description_uz)}</div>,
                description_en: <div>{parse(item.description_en)}</div>,
                comment_uz: <div>{parse(item.comment_uz)}</div>,
                comment_en: <div>{parse(item.comment_en)}</div>,
                writers: (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2,1fr)",
                      gap: "4px",
                    }}
                  >
                    {item?.writers?.map((item: any, index: number) => (
                      <Button key={index} target="blank" href={item.link}>
                        {item.name.slice(0, 20)}...
                      </Button>
                    ))}
                  </div>
                ),
                informations: (
                  <div>
                    {item?.informations?.map((item: any, index: number) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                        key={index}
                      >
                        <Button>
                          name : {item[`name_${language}`].slice(0, 10) + "..."}
                        </Button>
                        <Button>
                          info : {item[`info_${language}`].slice(0, 10) + "..."}
                        </Button>
                      </div>
                    ))}
                  </div>
                ),
                buttons: (
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      justifyContent: "end",
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
                          setIsModalOpen(true);
                          setModalParametrs({
                            status: "Delete",
                            id: item._id,
                          });
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
              }))}
            />
          </div>
        </div>
      </div>
    </>
  );
}
