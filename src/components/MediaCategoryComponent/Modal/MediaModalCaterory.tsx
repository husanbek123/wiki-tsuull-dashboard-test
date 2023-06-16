// For Form Data and Modal
import { Button, Form, Input, Modal } from "antd";
// style
import style from "./MediaCategoryComponent.module.scss";
// useTranslation hook on Translate
import { useTranslation } from "react-i18next";
// PostData hook
import { usePostData } from "../../../utils/hooks/usePost";
import SuccessToastify from "../../toastify/Success";
import { useState } from "react";
import ErrorToastify from "../../toastify/Error";
const MediaModalCaterory: React.FC = () => {
  // t function
  let { t } = useTranslation();

  // For Modal
  const [open, setOpen] = useState<boolean>(false);
  // confirmLoading For Loading
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  // OpenModal funciton
  const showModal = () => setOpen((prew) => !prew);
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  // usePost
  let usePost = usePostData("/media-category", {});
  // OnSubmit Funciton
  const onFinish = (values: { title_en: string; title_uz: string }) => {
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

  // modalContent Form Content
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
    <>
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
    </>
  );
};
export default MediaModalCaterory;
