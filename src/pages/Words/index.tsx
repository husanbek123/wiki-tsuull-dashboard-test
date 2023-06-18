// useState Hook
import { useState } from "react";
//  Button Table  Image Antd
import { Button, Table, Image } from "antd";
// Crud Navigator
import { CRUDNavigator } from "../../components/CRUDNavigator";
// style
import style from "./index.module.scss";
// TOOLTIP
import TOOLTIP from "../../components/Tooltip";
// React Icons
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { useGetData } from "../../utils/hooks/useGet";
// Table Columns
const columns = [
  { title: "Title Uz", dataIndex: "title_uz", key: "title_uz" },
  { title: "Title En", dataIndex: "title_en", key: "title_uz" },
  { title: "Comment En", dataIndex: "comment_en", key: "comment_en" },
  { title: "Description En", dataIndex: "description_en" },
  { title: "Description Uz", dataIndex: "description_uz" },
  { title: "Comment UZ", dataIndex: "comment_uz" },
  { title: "Img", dataIndex: "image" },
  { title: "", dataIndex: "buttons" },
];

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
  }>({
    status: null,
    id: null,
  });
  const [dataSource, setDataSource] = useState([]);
  let useGet = useGetData(["word"], "/word", {});
  const [success, setSuccess] = useState<boolean>(false);
  if (useGet.isSuccess && !success) {
    setDataSource(() => useGet.data?.data);
    setSuccess(() => true);
  }

  let dataResult: WordProps[] = useGet?.data?.data;

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
                Add <AiOutlinePlus />
              </p>
            </Button>
          </TOOLTIP>
        </div>

        <div className={style.table}>
          <Table
            columns={columns}
            dataSource={dataResult?.map((item: WordProps, index: any) => ({
              key: index + 1,
              title_uz: <p>{item?.title_uz}</p>,
              title_en: <p>{item?.title_en}</p>,
              comment_en: <p>{item?.comment_uz}</p>,
              comment_uz: <p></p>,
              description_en: <p>{item?.description_uz}</p>,
              description_uz: <p>{item?.description_uz}</p>,
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
              image: (
                <>
                  <div>
                    <img
                      width={89}
                      src={`http://13.50.238.54/file/${item?.image?._id}`}
                      alt={"word-img"}
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
