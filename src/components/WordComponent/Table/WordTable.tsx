import { WordProps } from "../../../types/defaultType";
import style from "./WordTablse.module.scss";
import { Button, Image, Input, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetData } from "../../../utils/hooks/useGet";
import Loading from "../../Loading/Loading";
import NotFound from "../../../pages/NotFound/NotFound";
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

export default function WordTable() {
  const { data, isLoading } = useGetData(["words"], "/word", {});
  let dataResult: WordProps[] = data?.data;
  if (isLoading) return <Loading />;
  if (!dataResult) return <NotFound />;
  return (
    <>
      <h1>WordTable</h1>
      
    </>
  );
}
