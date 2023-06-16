// For Form Data and Modal
import { Button, Form, Input, Modal } from "antd";
// useTranslation hook on Translate
import { useTranslation } from "react-i18next";
// SuccessToastify
import SuccessToastify from "../../toastify/Success";

import { useState } from "react";
// ErrorToastify
import ErrorToastify from "../../toastify/Error";
// usePostData Hook
import { usePostData } from "../../../utils/hooks/usePost";
// image type
import { image } from "../../../types/defaultType";
// style file location
import style from "./WordModal.module.scss";
// PostInterface
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
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const showModal = () => setOpen((prew) => !prew);
  const handleCancel = () => setOpen(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  let usePost = usePostData("/media-category", {});

  const onFinish = (values: WordModalProps) => {
    usePost.mutate(
      { ...values },
      {
        onSuccess: () => {
          SuccessToastify();
          handleCancel();
        },
        onError: () => ErrorToastify(),
      }
    );
  };

  const onFinishFailed = () => {
    ErrorToastify();
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
          name={"title_en"}
          label={"Title_en"}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"title_uz"}
          label={"Title_uz"}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

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
