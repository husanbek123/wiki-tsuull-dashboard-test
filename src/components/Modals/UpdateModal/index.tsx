import { Button, Form, Input, Upload, Modal } from "antd";
import { useGetData } from "../../../utils/hooks/useGet";
import { useState } from "react";
import SELECT from "../../Select";
import SuccessToastify from "../../toastify/Success";
import { useQueryClient } from "@tanstack/react-query";
import ErrorToastify from "../../toastify/Error";
import { usePatchData } from "../../../utils/hooks/usePatch";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import ImgCrop from "antd-img-crop";

interface image {
  path: string;
  _id: string;
}

export function Update(props: {
  id: string | number;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  postUrl: "/media" | "/phrase" | "/word" | "/media-category";
}) {
  // Props
  const { id, setIsModalOpen, isModalOpen } = props;
  // Media
  const useGetMedia = useGetData(["media"], "/media", {});
  // Details Media
  const useMediaPatch = usePatchData(`/media/${id}`, {});
  // Phrase dedatils
  const usePhrasePatch = usePatchData(`/phrase/${id}`, {});
  // All phrase
  const useGetPhrase = useGetData(["phrase"], "/phrase", {});
  // Media Catgory
  const useMediaCategory = usePatchData(`/media-category/${id}`, {});
  //
  let useMediaGetCategory = useGetData(["media-category"], "/media-category");
  const [fileList, setFileList] = useState([]);
  let useWordGet = useGetData(["word"], "/word", {});
  const [category, setCategory] = useState<{ value: string; label: string }[]>(
    []
  );

  let usePatchWord = usePatchData(`/word/${id}`, {});
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
    // media-category
    else if (props.postUrl == "/media-category") {
      useMediaCategory.mutate(
        {
          title_uz: values.title_uz || dataMediaCategory.title_uz,
          title_en: values.title_en || dataMediaCategory.title_en,
        },
        {
          onSuccess: () => {
            SuccessToastify();

            queryClient.invalidateQueries({
              queryKey: ["media-category"],
            });
            setIsModalOpen(false);
          },
          onError: () => {
            ErrorToastify();
          },
        }
      );
    } else if (props.postUrl == "/word") {
      let result = {
        title_uz: values?.title_uz || dataWordCategory?.title_uz,
        title_en: values?.title_en || dataWordCategory.title_en,
        description_uz:
          values?.description_uz || dataWordCategory?.description_uz,
        description_en:
          values?.description_en || dataWordCategory?.description_en,
        comment_en: values?.comment_en || dataWordCategory?.comment_en,
        comment_uz: values?.comment_en || dataWordCategory?.comment_uz,
        image : values?.image?._id || dataWordCategory?.image?._id
      };

      console.log(result);
      usePatchWord.mutate(
        result,
        {
          onSuccess: () => {
            SuccessToastify();
            console.log(result)
            queryClient.invalidateQueries({
              queryKey: ["word"],
            });
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

  const dataMediaCategory = useMediaGetCategory?.data?.data.find(
    (item: { _id: string }) => item._id === id
  );
  let dataWordCategory = useWordGet?.data?.data?.find(
    (item: { _id: string }) => item._id == id
  );

  const onPreview = async (file: any) => {
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
  let [newUploadId, setnewUploadId] = useState({} as image);

  const uploadOnChange = ({ fileList: newFileList, file }: any) => {
    setFileList(newFileList);
    setnewUploadId(file?.response);
  };

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

        {props.postUrl == "/media-category" && (
          <>
            <Form.Item
              label="Title uz"
              name="title_uz"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataMediaCategory.title_uz} />
            </Form.Item>
            <Form.Item
              label="Title en"
              name="title_en"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataMediaCategory.title_en} />
            </Form.Item>
          </>
        )}

        {props.postUrl == "/word" && (
          <>
            <Form.Item
              label="Title uz"
              name="title_uz"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataWordCategory?.title_uz} />
            </Form.Item>
            <Form.Item
              label="Title en"
              name="title_en"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataWordCategory.title_en} />
            </Form.Item>

            <Form.Item
              label="Description en"
              name="description_en"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataWordCategory.description_en} />
            </Form.Item>

            <Form.Item
              label="Description Uz"
              name="description_uz"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataWordCategory.description_uz} />
            </Form.Item>

            <Form.Item
              label="Comment Uz"
              name="comment_uz"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataWordCategory.comment_uz} />
            </Form.Item>

            <Form.Item
              label="Comment En"
              name="comment_en"
              // rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataWordCategory.comment_en} />
            </Form.Item>

            <ImgCrop rotationSlider>
              <Upload
                action={"http://13.50.238.54/file"}
                name="photo"
                fileList={fileList}
                onChange={uploadOnChange}
                onPreview={onPreview}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </ImgCrop>
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
