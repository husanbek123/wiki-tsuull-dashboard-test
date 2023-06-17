import React, { useState } from "react";
// For Form Data and Modal
import { Button, Form, Input, Modal, Upload } from "antd";
// useTranslation hook on Translate
import { useTranslation } from "react-i18next";
// SuccessToastify
import SuccessToastify from "../../toastify/Success";
// ErrorToastify
import ErrorToastify from "../../toastify/Error";
// usePostData Hook
import { usePostData } from "../../../utils/hooks/usePost";
// image type
import { image } from "../../../types/defaultType";
// style file location
import style from "./WordModal.module.scss";
// PostInterface
// ImgCrop
import ImgCrop from "antd-img-crop";
// Uplaod types
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
interface WordModalProps {
  title_uz: string;
  title_en: string;
  description_uz: string;
  description_en: string;
  comment_uz: string;
  comment_en: string;
  image: image;
}
const WordModal: React.FC = () => {
  // t function
  let { t } = useTranslation();
  // For Modal
  const [open, setOpen] = useState<boolean>(false);
  // confirmLoading For Loading
  // For Modal
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [photoId, setPhotoId] = useState({} as image);
  const showModal = () => setOpen((prew) => !prew);
  const handleCancel = () => setOpen(false);
  // fileList Upload
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList, file }: any) => {
    setFileList(newFileList);
    setPhotoId(file?.response);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  let usePost = usePostData("/word", {});
  const onFinish = (values: WordModalProps) => {
    usePost.mutate(
      { ...values, image: photoId?._id },
      {
        onSuccess: () => {
          SuccessToastify();
          handleCancel();
        },
        onError: () => ErrorToastify(),
      }
    );

    console.log(values);
  };

  const onFinishFailed = () => {
    ErrorToastify();
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const modalContent = () => {
    return (
      <Form
        onFinish={onFinish}
        className={style.Form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        name="basic"
      >
        <Form.Item
          name={"title_uz"}
          label={"Title_uz"}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"title_en"}
          label={"Title_en"}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"description_uz"}
          label={"Description_uz"}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"description_en"}
          label={"Description_en"}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"comment_uz"}
          label={"Comment_uz"}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"comment_en"}
          label={"Comment_en"}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <ImgCrop rotationSlider>
          <Upload
            action="http://13.50.238.54/file"
            listType="picture-card"
            name="photo"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        {t("add")}
      </Button>
      <Modal
        width={700}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {modalContent()}
      </Modal>
    </div>
  );
};

export default WordModal;
