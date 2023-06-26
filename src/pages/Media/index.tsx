/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "antd";
import { useGetData } from "../../utils/hooks/useGet";
import styles from "./index.module.scss";
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import TOOLTIP from "../../components/Tooltip";
import { useState } from "react";
import { CRUDNavigator } from "../../components/CRUDNavigator";
import videoIcon from "../../../public/videoIcon.png";
import Table, { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import ComponentLoader from "../../components/ComponentLoader";
import { useTheme } from "../../utils/zustand/useTheme";
import whiteVideoIcon from "../../../public/whiteVideoIcon.png";
import { ComponentBreadCrumb } from "../../components/Breadcrumb";
interface DataType {
  key: React.Key;
}

export default function Media() {
  const useGet = useGetData(["media"], `/media`, {});
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
  const theme = useTheme((state) => state.theme);
  const columns: ColumnsType<DataType> = [
    { title: t("title_uz"), dataIndex: "title_uz", key: "title_uz" },
    { title: t("title_en"), dataIndex: "title_en", key: "title_uz" },
    { title: t("frame"), dataIndex: "frame", key: "frame" },
    {
      title: "",
      dataIndex: "buttons",
      key: "buttons",
      fixed: "right",
      width: 100,
    },
  ];

  return (
    <div className={styles.Main}>
      <div className={styles.container}>
        <ComponentBreadCrumb url={t("Main")} />
        {isModalOpen && (
          <CRUDNavigator
            postUrl={"/media"}
            option={modalParametrs.status}
            id={modalParametrs.id}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            url={`${modalParametrs.url}`}
          />
        )}

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
            columns={columns}
            className={styles.table}
            loading={{
              indicator: (
                <div>
                  <ComponentLoader />
                </div>
              ),
              spinning: !useGet.data?.data,
            }}
            dataSource={useGet.data?.data
              ?.reverse()
              .map((item: any, index: any) => ({
                key: index + 1,
                title_uz: <p>{item.title_uz}</p>,
                title_en: <p>{item.title_en}</p>,

                frame: (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                    onClick={() => {
                      setModalParametrs({ status: "Frame", id: item._id });
                      setIsModalOpen(true);
                    }}
                  >
                    <img
                      src={theme === "dark" ? whiteVideoIcon : videoIcon}
                      alt=""
                      style={{
                        cursor: "pointer",
                        background: "transparent",
                      }}
                    />
                  </div>
                ),
                category_uz: (
                  <div>
                    {useGet?.data?.data[index]?.category?.map(
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
                      justifyContent: "center",
                    }}
                    className="dark-buttons"
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
                          borderColor: "green",
                          color: "green",
                        }}
                        onClick={() => {
                          setModalParametrs({
                            status: "Single",
                            id: item._id,
                            url: "/media",
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
  );
}
