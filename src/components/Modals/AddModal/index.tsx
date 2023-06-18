import {
  Button,
  Checkbox,
  Form,
  Input,
  Upload,
  Modal,
  UploadProps,
  Space,
} from "antd";
import ImgCrop from "antd-img-crop";
import SELECT from "../../Select";
import { useGetData } from "../../../utils/hooks/useGet";
import { useState } from "react";
import { usePostData } from "../../../utils/hooks/usePost";
import SuccessToastify from "../../toastify/Success";
import ErrorToastify from "../../toastify/Error";
import { BiPlus } from "react-icons/bi";
import { api } from "../../../utils/axios";
import { useToken } from "../../../utils/zustand/useStore";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { RichText } from "../../RichText";
import { RcFile } from "antd/es/upload";
import {useTranslation} from "react-i18next"
interface IData {
  label: string;
  value: string;
  isFixed?: boolean;
}

interface image {
    path: string;
    _id: string;
}

export function Add(props: {
  setIsModalOpen: (bool: boolean) => void;
  isModalOpen: boolean;
  postUrl: "/media" | "/phrase" | "/word" | "/media-category";
}) {
  let {t} =  useTranslation()
  const { setIsModalOpen, isModalOpen } = props;
  const useGetCategory = useGetData(["media-category"], "/media-category", {});
  const usePost = usePostData(`${props.postUrl}`);
  const [data, setDatas] = useState<IData[] | null>(null);
  const [categoryData, setCategoryData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isMain, setisMain] = useState(false);
  const [photoId, setPhotoId] = useState("");
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [comentUz, setComentUz] = useState("");
  const [comentEn, setComentEn] = useState("");
  const token = useToken((state) => state.token);
  const handleCancel = () => {
    setIsModalOpen(false);
    setDatas(null);
  };
  const queryClient = useQueryClient();
  let [newUploadId, setnewUploadId] = useState({} as image);
  const uploadProp: UploadProps = {
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        setPhotoId(info?.file?.response?._id);
      }
      if (info.file.status === "done") {
        SuccessToastify(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        ErrorToastify(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadOnChange = ({ fileList: newFileList, file }: any) => {
    setFileList(newFileList);
    setnewUploadId(file?.response);
  };

  const onFinish = (values: any) => {
    // media
    if (props.postUrl == "/media") {
      usePost.mutate(
        {
          ...values,
          category: categoryData.map((i: { value: string }) => i.value),
        },
        {
          onSuccess: () => {
            SuccessToastify();
            setIsModalOpen(false);
            queryClient.invalidateQueries({
              queryKey: ["media"],
            });
          },
          onError: () => {
            ErrorToastify();
          },
        }
      );
    }
    // phrase
    else if (props.postUrl == "/phrase") {
      usePost.mutate(
        {
          ...values,
          comment_uz: comentUz,
          comment_en: comentEn,
          description_uz: descriptionUz,
          description_en: descriptionEn,
          isMain,
          image: photoId,
        },
        {
          onSuccess: () => {
            SuccessToastify();
            setIsModalOpen(false);
            queryClient.invalidateQueries({
              queryKey: ["phrase"],
            });
          },
          onError: () => {
            ErrorToastify();
          },
        }
      );
    }
    // media-category
    else if (props.postUrl == "/media-category") {
      usePost.mutate(
        {
          ...values,
        },
        {
          onSuccess: () => {
            SuccessToastify();
            setIsModalOpen(false);
            queryClient.invalidateQueries({
              queryKey: ["media-category"],
            });
          },
          onError: () => {
            ErrorToastify();
          },
        }
      );
    }
    // Word
    else if (props.postUrl == "/word") {
      let result = {
        ...values,
        image: newUploadId?._id,
      };

      console.log(result);
      usePost.mutate(
        result,
        {
          onSuccess: () => {
            SuccessToastify();
            setIsModalOpen(false);
            queryClient.invalidateQueries({
              queryKey: ["word"],
            });
          },
          onError: () => {
            ErrorToastify();
          },
        }
      );
    }
    setDatas(null);
  };

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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  if (useGetCategory.isSuccess && data == null) {
    for (let i = 0; i < useGetCategory.data.data.length; i++) {
      const category = useGetCategory.data.data[i];
      setDatas((prev: any) =>
        prev
          ? [
              ...prev,
              {
                value: category._id,
                label: category.title_uz,
              },
            ]
          : [
              {
                value: category._id,
                label: category.title_uz,
              },
            ]
      );
    }
  }
  return (
    <Modal title={t("add")} open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form
        name="add_media"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={t("title_uz")}
          name="title_uz"
          rules={[{ required: true, message: "Please enter" }]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label={t("title_en")}
          name="title_en"
          rules={[{ required: true, message: "Please enter" }]}
        >
          <Input />
        </Form.Item>

        {props.postUrl == "/media" && (
          <>
            <Form.Item
              label="Frame"
              name="frame"
              rules={[{ required: true, message: "Please enter" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="category">
              <SELECT data={data} setCategoryData={setCategoryData} />
            </Form.Item>
          </>
        )}
        {props.postUrl == "/phrase" && (
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
                value={descriptionUz}
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
                value={descriptionEn}
                setValue={setDescriptionEn}
              ></RichText>
            </div>
            <div
              style={{
                margin: "20px 0px",
              }}
            >
              Comment uz
              <RichText value={comentUz} setValue={setComentUz}></RichText>
            </div>
            <div
              style={{
                margin: "20px 0px",
              }}
            >
              Comment en
              <RichText value={comentEn} setValue={setComentEn}></RichText>
            </div>
            <Form.Item>
              <Checkbox onChange={(e) => setisMain(e.target.checked)}>
                is Main
              </Checkbox>
            </Form.Item>
            <Upload
              {...uploadProp}
              action={api + "/file"}
              name={"photo"}
              headers={{
                Authorization: `Bearer ${token}`,
              }}
            >
              <Button icon={<BiPlus />}>Click to Upload</Button>
            </Upload>
          </>
        )}

        {props?.postUrl == "/word" && (
          <>
            <Form.Item
              label={t("description_uz")}
              name="description_uz"
              rules={[{ required: true, message: "Please enter" }]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Description EN"
              name="description_en"
              rules={[{ required: true, message: "Please enter" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name={"comment_uz"} label="Comment Uz">
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item label="Comment EN" name={"comment_en"}>
              <Input
                style={{
                  width: "100%",
                }}
              />
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
