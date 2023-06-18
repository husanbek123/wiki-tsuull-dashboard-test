/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "antd";
import { useGetData } from "../../utils/hooks/useGet";
import styles from "./index.module.scss";
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import TOOLTIP from "../../components/Tooltip";
import { useState } from "react";
import { CRUDNavigator } from "../../components/CRUDNavigator";
<<<<<<< HEAD
import videoIcon from "../../../public/videoIco.png";
import Table, { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
}

const columns: ColumnsType<DataType> = [
=======
import { useTranslation } from "react-i18next";
const columns = [
>>>>>>> 151356f7cff733c258bfd9a8bc64109dfc583cde
  { title: "TITLE UZ", dataIndex: "title_uz", key: "title_uz" },
  { title: "TITLE EN", dataIndex: "title_en", key: "title_uz" },
  { title: "FRAME", dataIndex: "frame", key: "frame" },
  { title: "CATEGORY UZ", dataIndex: "category_uz", key: "category_uz" },
  { title: "CATEGORY EN", dataIndex: "category_en", key: "category_uz" },
  {
    title: "",
    dataIndex: "buttons",
    key: "buttons",
    fixed: "right",
    width: 100,
  },
];

export default function Media() {
  const useGet = useGetData(["media"], `/media`, {});
<<<<<<< HEAD
=======
  const [success, setSuccess] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState([]);
>>>>>>> 151356f7cff733c258bfd9a8bc64109dfc583cde
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalParametrs, setModalParametrs] = useState<{
    status: any;
    id?: any;
    url?: string;
  }>({
    status: null,
    id: null,
  });

  let {t} = useTranslation()

  return (
    <div className={styles.Main}>
      <div className={styles.container}>
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
<<<<<<< HEAD
          <TOOLTIP title={"Add"} key={"Add"} color="blue">
=======
          {/* <InputTableFilter
            value={value}
            setValue={setValue}
            setDataSource={setDataSource}
            zaprosData={useGet?.data?.data}
          ></InputTableFilter> */}
          <TOOLTIP title={t("add")} key={"Add"} color="blue">
>>>>>>> 151356f7cff733c258bfd9a8bc64109dfc583cde
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
            dataSource={useGet.data?.data.map((item: any, index: any) => ({
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
                    src={videoIcon}
                    alt=""
                    style={{
                      cursor: "pointer",
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
