import * as React from "react";
import { Button, Input, Modal, Upload } from "antd";
import style from "./WordModal.module.scss";
import { useTranslation } from "react-i18next";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostData } from "../../../utils/hooks/usePost";
interface image {
  image: {
    path: string;
    _id: string;
  };
}

interface WordPost {
  title_uz: string;
  title_en: string;
  description_uz: string;
  description_en: string;
  comment_uz: string;
  comment_en: string;
  image: image;
}



export default function WordModal() {
  let { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  let queryClient = useQueryClient();
  const showModal = () => setIsModalOpen((prew) => !prew);
  const handleCancel = () => setIsModalOpen(false);
  let wordPost = usePostData('/word', {});
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

  // const mutations = useMutation(
  //   (newSubject: WordPost) => createWord(newSubject),
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //   }
  // );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let result: WordPost = {
      ...values,
      image: PhotoId,
    };
    wordPost.mutate(result, {
      onSuccess: (data) => {
        console.log(data)
      }
    });
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
        <form onSubmit={(e) => handleSubmit(e)}>
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


