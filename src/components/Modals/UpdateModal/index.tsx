import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useGetData } from "../../../utils/hooks/useGet";
import { useState } from "react";
import SELECT from "../../Select";
import SuccessToastify from "../../toastify/Success";
import { useQueryClient } from "@tanstack/react-query";
import ErrorToastify from "../../toastify/Error";
import { usePatchData } from "../../../utils/hooks/usePatch";
export function Update(props: {
  id: string | number;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  postUrl: "/media" | "/phrase" | "/word" | "/media-category";
}) {
  const { id, setIsModalOpen, isModalOpen } = props;
  const useMediaPatch = usePatchData(`/media/${id}`, {});
  const usePhrasePatch = usePatchData(`/phrase/${id}`, {});
  const useGetMedia = useGetData(["media"], "/media", {});
  const useGetPhrase = useGetData(["phrase"], "/phrase", {});
  const [category, setCategory] = useState<{ value: string; label: string }[]>(
    []
    );
    const queryClient = useQueryClient();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    if (props.postUrl === "/media") {
      console.log({
        title_uz: values.title_uz || dataMedia.title_uz,
        title_en: values.title_en || dataMedia.title_en,
        frame: values.frame || dataMedia.frame,
        category: category.length ? category : dataMedia.category,
      });

      useMediaPatch.mutate(
        {
          title_uz: values.title_uz || dataMedia.title_uz,
          title_en: values.title_en || dataMedia.title_en,
          frame: values.frame || dataMedia.frame,
          category: category.length ? category : dataMedia.category,
        },
        {
          onSuccess: () => {
            SuccessToastify();
            queryClient.invalidateQueries({ queryKey: ["media"] });
            setIsModalOpen(false);
          },
          onError: () => {
            ErrorToastify();
          },
        }
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const dataMedia = useGetMedia?.data?.data?.find(
    (item: { _id: string }) => item._id === id
  );
  const dataPhrase = useGetPhrase?.data?.data?.find(
    (item: { _id: string }) => item._id === id
  );

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {props.postUrl == "/media" && (
          <>
            <Form.Item
              label="Title uz"
              name="title_uz"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataMedia.title_uz} />
            </Form.Item>
            <Form.Item
              label="Title en"
              name="title_en"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataMedia.title_en} />
            </Form.Item>
            <Form.Item
              label="Frame"
              name="frame"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataMedia.frame} />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <SELECT
                data={useGetMedia?.data?.data
                  .map((i: { category: any }) => i.category)
                  .flat(2)
                  .map((i: { _id: string; title_uz: string }) => ({
                    value: i._id,
                    label: i.title_uz,
                  }))}
                setCategoryData={setCategory}
                defaultValue={dataMedia.category.map(
                  (i: { _id: string; title_uz: string }) => ({
                    value: i._id,
                    label: i.title_uz,
                  })
                )}
              />
            </Form.Item>
          </>
        )}
        <div
          style={{
            display: "flex",
            gap: "10px",
            width: "100%",
            height: "50px",
            justifyContent: "end",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
