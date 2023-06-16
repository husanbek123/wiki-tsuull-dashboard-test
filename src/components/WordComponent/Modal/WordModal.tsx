import * as React from "react";
import { Button, Input, Modal, Upload } from "antd";
import style from "./WordModal.module.scss";
import { useTranslation } from "react-i18next";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
async function createSubject(data: WordPost) {
  return axios.post("http://13.50.238.54/word", data);
}

interface WordPost {
  name_uz: string;
  name_ru: string;
  name_en: string;
  image: image;
}

interface image {
  image: {
    path: string;
    _id: string;
  };
}

export default function WordModal() {
  let { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => setIsModalOpen((prew) => !prew);
  const handleCancel = () => setIsModalOpen(false);

  const [fileList, setFileList] = React.useState([]);
  const [PhotoId, setPhotoId] = React.useState({} as image);
  let [values, setValue] = React.useState({
    title_uz: "",
    title_en: "",
    description_uz: "",
    description_en: "",
    comment_uz: "",
    comment_en: "",
  });
  const onChange = ({ fileList: newFileList, file }: any) => {
    setFileList(newFileList);
    setPhotoId(file?.response);
  };
  return (
    <div className={style.wordModal}>
      <Button onClick={showModal} className={style.WordModal}>
        {t("add")}
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        title={t("Words-Modal")}
      >
        <form onClick={(e) => {
          e.preventDefault();

        }}>
          <Input
            type="text"
            placeholder="Title_uz"
            onChange={(e) => setValue({ ...values, title_uz: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Title_en"
            onChange={(e) => setValue({ ...values, title_en: e.target.value })}
          />
          <Input
            onChange={(e) =>
              setValue({ ...values, description_uz: e.target.value })
            }
            placeholder="description_uz"
          />
          <Input
            onChange={(e) =>
              setValue({ ...values, description_en: e.target.value })
            }
            placeholder="description_en"
          />
          <Input
            type="text"
            placeholder="Comment_uz"
            onChange={(e) =>
              setValue({ ...values, comment_uz: e.target.value })
            }
          />
          <Input
            type="text"
            onChange={(e) =>
              setValue({ ...values, comment_en: e.target.value })
            }
            placeholder="Comment En"
          />
          <button type="submit">submit</button>

          <Upload
            action={"http://13.50.238.54/file/"}
            name="photo"
            fileList={fileList}
            onChange={onChange}
          >
            <Button
              className="text-[14px] font-bold font-mono "
              icon={<UploadOutlined />}
            >
              Загрузить изображение
            </Button>
          </Upload>
        </form>
      </Modal>
    </div>
  );
}
