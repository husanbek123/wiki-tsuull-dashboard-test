import { WordProps } from "../../../types/defaultType";
import style from "./WordTablse.module.scss";
import { Button, Image } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetData } from "../../../utils/hooks/useGet";
import Loading from "../../Loading/Loading";
import NotFound from "../../../pages/NotFound/NotFound";
export default function WordTable() {
  // const { data, isLoading } = useGetData(["words"], "/word", {});
  let data = {
    data : []
  }
  let dataResult: WordProps[] = data?.data;
  // if (isLoading) return <Loading />;
  if (!dataResult) return <NotFound />;
  return (
    <div className={style.wordData}>
      <div className="w-[90%] border px-4 rounded-md mx-auto my-3">
        {dataResult?.map(({  comment_uz, image }, index) => (
          <div
            key={index}
            className="flex border-2 my-3 rounded-md px-3 items-center justify-between"
          >
            <div className="p-2 gap-3  flex-col flex">
              <div className="flex">
                <h4>{comment_uz}</h4>
              </div>
              <div className="my-3">
                <h4>Изображение</h4>
                <Image
                  width={100}
                  height={100}
                  src={`http://13.50.238.54/file/${image?.path}`}
                  alt="lang-img"
                />
              </div>
            </div>

            <div className="lang-icons p-2 flex items-center gap-3">
              <DeleteOutlined  className="bg-red-500 text-white py-2 px-2 text-[20px] cursor-pointer rounded-md" />
              <EditOutlined className="bg-blue-500 text-white py-2 px-2 text-[20px] cursor-pointer rounded-md" />
              <Button  className="bg-blue-400 text-white">подробный</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
