import ImgCrop from "antd-img-crop";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Space,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useGetData } from "../../../utils/hooks/useGet";
import { useState } from "react";
import SELECT from "../../Select";
import SuccessToastify from "../../toastify/Success";
import { useQueryClient } from "@tanstack/react-query";
import ErrorToastify from "../../toastify/Error";
import { usePatchData } from "../../../utils/hooks/usePatch";
import { postUrl } from "../../../types/defaultType";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { RichText } from "../../RichText";
import { api } from "../../../utils/axios";
import { useToken } from "../../../utils/zustand/useStore";
import { useTranslation } from "react-i18next";
import { RcFile } from "antd/es/upload";
export function Update(props: {
  id: string | number;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  postUrl: postUrl;
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
  // useTranslation Hook  React-i18next
  let { t } = useTranslation();
  // Token For Header
  const token = useToken((state) => state.token);
  // Upload Props
  const uploadProp: UploadProps = {
    onChange(info) {
      if (info.file.status !== "uploading") {
        setPhotoId(info?.file?.response?._id);
      }
      if (info.file.status === "done") {
        SuccessToastify(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        ErrorToastify(`${info.file.name} file upload failed.`);
      }
    },
  };

  // all Word Data

  const useWordData = useGetData(["word"], "/word", {});
  const useWordPatch = usePatchData(`/word/${id}`, {});
  const useMediaCategoryPatch = usePatchData(`/media-category/${id}`, {});
  const useMediaCategory = useGetData(["media-category"], '/media-category')
  // Data States
  const [isMain, setisMain] = useState(false);
  const [photoId, setPhotoId] = useState("");
  const [descriptionUz, setDescriptionUz] = useState(null);
  const [descriptionEn, setDescriptionEn] = useState(null);
  const [comentUz, setComentUz] = useState(null);
  const [comentEn, setComentEn] = useState(null);

  // QueryClient For Real Time
  const queryClient = useQueryClient();

  // Modal Functions
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);
  const onFinish = (values: any) => {
    if (props.postUrl === "/media") {
      useMediaPatch.mutate(
        {
          title_uz: values.title_uz || dataMedia.title_uz,
          title_en: values.title_en || dataMedia.title_en,
          frame: values.frame || dataMedia.frame,
          category: dataMedia.category,
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
    if (props.postUrl === "/phrase") {
      usePhrasePatch.mutate(
        {
          title_uz: values.title_uz,
          title_en: values.title_en,
          description_uz: descriptionUz,
          description_en: descriptionEn,
          comment_uz: comentUz,
          comment_en: comentEn,
          writers: values.writers,
          informations: values.informations,
          image: photoId,
          isMain: isMain,
        },
        {
          onSuccess: () => {
            SuccessToastify();
            queryClient.invalidateQueries({ queryKey: ["phrase"] });
            setIsModalOpen(false);
          },
          onError: () => {
            ErrorToastify();
          },
        }
      );
    }
    if (props.postUrl === "/word") {
      useWordPatch.mutate(
        {
          title_uz: values.title_uz,
          title_en: values.title_en,
          description_uz: values?.descriptionUz,
          description_en: values?.descriptionEn,
          comment_uz: values?.comment_uz,
          comment_en: values?.comment_en,
          image: photoId,
        },
        {
          onSuccess: () => {
            SuccessToastify();
            queryClient.invalidateQueries({ queryKey: ["word"] });
            setIsModalOpen(false);
          },
          onError: () => {
            ErrorToastify();
          },
        }
      );
    }
    if (props.postUrl === "/media-category") {
      useMediaCategoryPatch.mutate(
        {
          title_uz: values.title_uz,
          title_en: values.title_en,
        },
        {
          onSuccess: () => {
            SuccessToastify();
            queryClient.invalidateQueries({ queryKey: ["media-category"] });
            setIsModalOpen(false);
          },
          onError: () => {
            ErrorToastify();
          },
        }
      );
    }
  };

  const useWordGetData = useWordData?.data?.data?.find(
    (item: { _id: string }) => item._id === id
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const dataMedia = useGetMedia?.data?.data?.find(
    (item: { _id: string }) => item._id === id
  );

  const useMediaCategoryDataId =useMediaCategory?.data?.data?.find(
    (item: { _id: string }) => item._id === id
  );

  if (useGetPhrase.isSuccess && photoId?.trim() == "") {
    setPhotoId(
      useGetPhrase.data?.data.find((item: any) => item._id == id)?.image._id
    );
    setisMain(
      useGetPhrase.data?.data.find((item: any) => item._id == id)?.isMain
    );
  }

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: useWordGetData?._id,
      name: "image.png",
      status: "done",
      url: `${api}/file/${useWordGetData?.image?.path}`,
    },
  ]);

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

  const onChange = ({ fileList: newFileList, file }: any) => {
    setFileList(newFileList);
    setPhotoId(file?.response?._id);
  };

  console.log(useMediaCategoryDataId)

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      width={1000}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          writers: useGetPhrase.data?.data.find((item: any) => item._id == id)
            ?.writers,
          informations: useGetPhrase.data?.data.find(
            (item: any) => item._id == id
          )?.informations,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {props.postUrl == "/media" && (
          <>
            <Form.Item label="Title uz" name="title_uz">
              <Input defaultValue={dataMedia?.title_uz} />
            </Form.Item>
            <Form.Item label="Title en" name="title_en">
              <Input defaultValue={dataMedia?.title_en} />
            </Form.Item>
            <Form.Item
              label="Frame"
              name="frame"
              rules={[{ required: true, message: "Missing" }]}
            >
              <Input defaultValue={dataMedia.frame} />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Missing" }]}
            >
              <SELECT
                data={useGetMedia?.data?.data
                  .map((i: { category: any }) => i.category)
                  .flat(2)
                  .map((i: { _id: string; title_uz: string }) => ({
                    value: i._id,
                    label: i.title_uz,
                  }))}
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

        {props.postUrl == "/phrase" && (
          <>
            <>
              <Form.List name="writers">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "grid",
                          marginBottom: 8,
                          justifyContent: "center",
                          alignItems: "center",
                          gridTemplateColumns: "repeat(1,1fr)",
                          position: "relative",
                          paddingLeft: "40px",
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[{ required: true, message: "Missing" }]}
                        >
                          <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "link"]}
                          rules={[{ required: true, message: "Missing " }]}
                        >
                          <Input placeholder="Link" />
                        </Form.Item>
                        <MinusCircleOutlined
                          style={{
                            position: "absolute",
                            right: "20%",
                            top: "35%",
                            fontSize: "22px",
                          }}
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                    <Form.Item
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        style={{
                          width: "400px",
                          margin: "0 auto",
                        }}
                      >
                        Add writer
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.List name="informations">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "grid",
                          marginBottom: 8,
                          gridTemplateColumns: "repeat(1,1fr)",
                          margin: "0 auto",
                          position: "relative",
                          paddingLeft: "40px",
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "name_uz"]}
                          rules={[{ required: true, message: "Missing" }]}
                        >
                          <Input placeholder="Name uz" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "name_en"]}
                          rules={[{ required: true, message: "Missing " }]}
                        >
                          <Input placeholder="Name en" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "info_uz"]}
                          rules={[{ required: true, message: "Missing " }]}
                        >
                          <Input placeholder="Info uz" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "info_en"]}
                          rules={[{ required: true, message: "Missing " }]}
                        >
                          <Input placeholder="Info en" />
                        </Form.Item>

                        <MinusCircleOutlined
                          style={{
                            position: "absolute",
                            right: "20%",
                            top: "45%",
                            fontSize: "22px",
                          }}
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                    <Form.Item
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        style={{
                          width: "400px",
                          margin: "0 auto",
                        }}
                        icon={<PlusOutlined />}
                      >
                        Add information
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <div
                style={{
                  margin: "20px 0px",
                }}
              >
                Description uz
                <RichText
                  value={
                    descriptionUz == null
                      ? useGetPhrase.data?.data.find(
                          (item: any) => item._id == id
                        )?.description_uz
                      : descriptionUz
                  }
                  setValue={setDescriptionUz}
                ></RichText>
              </div>
              <div
                style={{
                  margin: "20px 0px",
                }}
              >
                Description en
                <RichText
                  value={
                    descriptionEn == null
                      ? useGetPhrase.data?.data.find(
                          (item: any) => item._id == id
                        )?.description_en
                      : descriptionEn
                  }
                  setValue={setDescriptionEn}
                ></RichText>
              </div>
              <div
                style={{
                  margin: "20px 0px",
                }}
              >
                Comment uz
                <RichText
                  value={
                    comentUz == null
                      ? useGetPhrase.data?.data.find(
                          (item: any) => item._id == id
                        )?.comment_uz
                      : comentUz
                  }
                  setValue={setComentUz}
                ></RichText>
              </div>
              <div
                style={{
                  margin: "20px 0px",
                }}
              >
                Comment en
                <RichText
                  value={
                    comentEn == null
                      ? useGetPhrase.data?.data.find(
                          (item: any) => item._id == id
                        )?.comment_en
                      : comentEn
                  }
                  setValue={setComentEn}
                ></RichText>
              </div>
              <Form.Item>
                <Checkbox
                  checked={isMain}
                  onChange={(e) => setisMain(e.target.checked)}
                >
                  is Main
                </Checkbox>
              </Form.Item>
              <Upload
                {...uploadProp}
                action={api + "/file"}
                name={"photo"}
                defaultFileList={[
                  {
                    uid: "0",
                    name: "image",
                    status: "done",
                    url:
                      api +
                      "/file/" +
                      useGetPhrase.data?.data.find(
                        (item: any) => item._id == id
                      ).image.path,
                  },
                ]}
                maxCount={1}
                headers={{
                  Authorization: `Bearer ${token}`,
                }}
              >
                <Button>Click to Upload</Button>
              </Upload>
            </>
          </>
        )}

        {props.postUrl == "/word" && (
          <>
            <Form.Item label={t("title_uz")} name={"title_uz"}>
              <Input
                defaultValue={useWordGetData?.title_uz}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item label={t("title_en")} name={"title_en"}>
              <Input
                defaultValue={useWordGetData?.title_en}
                style={{
                  width: "100%",
                }}
                required
              />
            </Form.Item>

            <Form.Item label={t("comment_en")} name={"comment_en"}>
              <Input
                defaultValue={useWordGetData?.comment_en}
                style={{
                  width: "100%",
                }}
                required
              />
            </Form.Item>

            <Form.Item label={t("comment_uz")} name={"comment_uz"}>
              <Input
                defaultValue={useWordGetData?.comment_uz}
                style={{
                  width: "100%",
                }}
                required
              />
            </Form.Item>

            <Form.Item
              label={t("description_en")}
              name={"description_en"}
            >
              <Input
                defaultValue={useWordGetData?.description_en}
                style={{
                  width: "100%",
                }}
                required
              />
            </Form.Item>

            <Form.Item label={t("description_uz")} name={"description_uz"}>
              <Input
                defaultValue={useWordGetData?.description_uz}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              required
              rules={[{ required: true, message: "Missing" }]}
            >
              <Upload
                action={api + "/file"}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                name="photo"
                onPreview={onPreview}
              >
                {fileList.length < 2 && "+ Upload"}
              </Upload>
            </Form.Item>
          </>
        )}

        {props?.postUrl == "/media-category" && (
          <>
            <Form.Item name={"title_uz"} label={t("title_uz")} required>
              <Input
                defaultValue={useMediaCategoryDataId?.title_uz}
                required
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item name={"title_en"} label={t("title_en")} required>
              <Input
                defaultValue={useMediaCategoryDataId?.title_en}
                required
                style={{
                  width: "100%",
                }}
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
