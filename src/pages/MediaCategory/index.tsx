/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Table } from "antd";
import style from "./index.module.scss";
import { CRUDNavigator } from "../../components/CRUDNavigator";
// TOOLTIP
import TOOLTIP from "../../components/Tooltip";
// React Icons
import { AiOutlinePlus } from "react-icons/ai";
// React Icons
import { BsFillEyeFill, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
// Use Get Hook
import { useGetData } from "../../utils/hooks/useGet";
import { useTranslation } from "react-i18next";
import ComponentLoader from "../../components/ComponentLoader";
import { ComponentBreadCrumb } from "../../components/Breadcrumb";

interface MediaCategoryData {
  _id: string;
  title_uz: string;
  title_en: string;
}

export default function MediaCategory() {
  const useGet = useGetData(["media-category"], "/media-category");
  const [success, setSuccess] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_, setDataSource] = useState([]);
  const [modalParametrs, setModalParametrs] = useState<{
    status: any;
    id?: any;
    url?: string;
  }>({
    status: null,
    id: null,
  });
  if (useGet.isSuccess && !success) {
    setDataSource(() => useGet.data.data);
    setSuccess(() => true);
  }

  const { t } = useTranslation();

  // Table Columns
  const columns = [
    { title: t("title_uz"), dataIndex: "title_uz", key: "title_uz" },
    { title: t("title_en"), dataIndex: "title_en", key: "title_uz" },
    { title: "", dataIndex: "buttons" },
  ];

  const dataResult: MediaCategoryData[] =
    // eslint-disable-next-line no-unsafe-optional-chaining
    useGet?.data?.data == undefined ? [] : [...useGet?.data?.data]?.reverse();
  return (
    <div className={style.Main}>
      <div className={style.container}>
<<<<<<< HEAD
      <ComponentBreadCrumb url={t("MediaCategory")}/>
=======
        <ComponenBreadCrumb
          url={`${t("MediaCategory")}`.split("-").join(" ")}
        />
>>>>>>> c373c7a4588ea36ab26d5f88e246a8db66791ca2

        {isModalOpen && (
          <CRUDNavigator
            postUrl={"/media-category"}
            option={modalParametrs.status}
            id={modalParametrs.id}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            url={""}
          />
        )}
        <div className={style.Add}>
          <TOOLTIP title={t("add")} key={"Add"} color="blue">
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
              spinning: !dataResult.length,
            }}
            columns={columns}
            dataSource={dataResult?.map((item: any, index: any) => ({
              key: index + 1,
              title_uz: <p>{item.title_uz}</p>,
              title_en: <p>{item.title_en}</p>,
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
                          url: "/",
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
