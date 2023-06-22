/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
  Form,
  Input,
  Upload,
  Modal,
  Space,
  UploadFile,
  Collapse,
} from "antd";
import SELECT from "../../Select";
import { useGetData } from "../../../utils/hooks/useGet";
import { useState } from "react";
import ImgCrop from "antd-img-crop";
import { usePostData } from "../../../utils/hooks/usePost";
import SuccessToastify from "../../toastify/Success";
import ErrorToastify from "../../toastify/Error";
import { api } from "../../../utils/axios";
import type { RcFile } from "antd/es/upload/interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { RichText } from "../../RichText";
import { postUrl } from "../../../types/defaultType";
import { useTranslation } from "react-i18next";
interface IData {
  label: string | null;
  value: string | null;
  isFixed?: boolean;
}

export function Add(props: {
  setIsModalOpen: (bool: boolean) => void;
  isModalOpen: boolean;
  postUrl: postUrl;
}) {
  const { t } = useTranslation();
  const { setIsModalOpen, isModalOpen } = props;
  const useGetCategory = useGetData(["media-category"], "/media-category", {});
  const usePost = usePostData(`${props.postUrl}`);
  const [data, setDatas] = useState<IData[] | null>(null);
  const [categoryData, setCategoryData] = useState<IData>({
    value: null,
    label: null,
  });
  const [infoUz, setInfoUz] = useState("");
  const [infoEn, setInfoEn] = useState("");
  const [fields, setFields] = useState<
    {
      info_uz?: string;
      info_en?: string;
      name_uz?: string;
      name_en?: string;
    }[]
  >([]);
  const [isMain, setisMain] = useState(false);
  const [photoId, setPhotoId] = useState<string>("");
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [comentUz, setComentUz] = useState("");
  const [comentEn, setComentEn] = useState("");
  const handleCancel = () => {
    setIsModalOpen(false);
    setDatas(null);
  };

  const queryClient = useQueryClient();
  /* For Upload Change  */
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange = ({ fileList: newFileList, file }: any) => {
    setFileList(newFileList);
    setPhotoId(file?.response?._id);
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

  /* For Upload Change End  */

  const onFinish = (values: any) => {
    if (photoId.trim() === "") {
      ErrorToastify("Missing photo");
    } else {
      // media
      if (props.postUrl == "/media") {
        console.log({
          ...values,
          category: categoryData,
        });

        usePost.mutate(
          {
            ...values,
            category: categoryData.value,
          },
          {
            onSuccess: () => {
              SuccessToastify("");
              setIsModalOpen(false);
              setDatas(null);
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
        // usePost.mutate(
        //   {
        //     ...values,
        //     comment_uz: comentUz,
        //     comment_en: comentEn,
        //     description_uz: descriptionUz,
        //     description_en: descriptionEn,
        //     informations: values.informations || [],
        //     writers: values.writers || [],
        //     isMain,
        //     image: photoId,
        //   },
        //   {
        //     onSuccess: () => {
        //       SuccessToastify();
        //       setIsModalOpen(false);
        //       queryClient.invalidateQueries({
        //         queryKey: ["phrase"],
        //       });
        //     },
        //     onError: () => {
        //       ErrorToastify();
        //     },
        //   }
        // );
        console.log({
          comment_uz: comentUz,
          comment_en: comentEn,
          description_uz: descriptionUz,
          description_en: descriptionEn,
          informations:
            values.informations.map((item: any) => ({
              info_uz: item.info_uz,
              info_en: item.info_en,
              name_uz: item.name_uz,
              name_en: item.name_en,
            })) || [],
          writers: values.writers || [],
          isMain,
          image: photoId,
        });
      } else if (props.postUrl == "/word") {
        const result = {
          ...values,
          comment_uz: comentUz,
          comment_en: comentEn,
          description_uz: descriptionUz,
          description_en: descriptionEn,
          image: photoId,
        };
        usePost.mutate(result, {
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
        });
      } else if (props.postUrl == "/media-category") {
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
    }
    return;
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
    <Modal
      title={t("add")}
      width={1000}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="add_media"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 700,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignContent: "center",
          margin: "0 auto",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Collapse
          items={[
            {
              key: "1",
              label: `${t("title")}`,
              children: (
                <>
                  <Form.Item
                    label={t("title_uz")}
                    name="title_uz"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={t("title_en")}
                    name="title_en"
                    rules={[{ required: true, message: "Please enter" }]}
                  >
                    <Input
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </>
              ),
            },
          ]}
        />

        {props.postUrl == "/media" && (
          <>
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Others",
                  children: (
                    <>
                      <Form.Item
                        label="Frame"
                        name="frame"
                        rules={[{ required: true, message: "Please enter" }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item label="Category" name="category">
                        <SELECT data={data} setData={setCategoryData} />
                      </Form.Item>
                    </>
                  ),
                },
              ]}
            />
          </>
        )}
        {props.postUrl == "/phrase" && (
          <>
            <Collapse
              defaultActiveKey={photoId === "" ? ["6"] : []}
              items={[
                {
                  key: "1",
                  label: `${t("writers")}`,
                  children: (
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
                                <Input
                                  style={{
                                    width: "100%",
                                  }}
                                  placeholder="Name"
                                />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "link"]}
                                rules={[
                                  { required: true, message: "Missing " },
                                ]}
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
                  ),
                },
                {
                  key: "2",
                  label: "Information",
                  children: (
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
                                <Input placeholder={`${t("name")} uz`} />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "name_en"]}
                                rules={[
                                  { required: true, message: "Missing " },
                                ]}
                              >
                                <Input placeholder={`${t("name")} en`} />
                              </Form.Item>
                              <Form.Item name={[name, "info_uz"]}>
                                <p className="addText"> {t("info")} uz </p>
                                <RichText
                                  value={infoUz}
                                  setValue={setInfoUz}
                                ></RichText>
                              </Form.Item>
                              <Form.Item name={[name, "info_en"]}>
                                <p className="addText">
                                  {" "}
                                  {t("information")} en
                                </p>
                                <RichText
                                  value={infoEn}
                                  setValue={setInfoEn}
                                ></RichText>
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
                  ),
                },
                {
                  key: "3",
                  label: `${t("Descriptions")}`,
                  children: (
                    <>
                      <div
                        style={{
                          margin: "20px 0px",
                        }}
                        className="addText"
                      >
                        {t("Description")} uz
                        <RichText
                          value={descriptionUz}
                          setValue={setDescriptionUz}
                        ></RichText>
                      </div>
                      <div
                        style={{
                          margin: "20px 0px",
                        }}
                        className="addText"
                      >
                        {t("Description")} en
                        <RichText
                          value={descriptionEn}
                          setValue={setDescriptionEn}
                        ></RichText>
                      </div>
                    </>
                  ),
                },
                {
                  key: "4",
                  label: `${t("Comment")}`,
                  children: (
                    <>
                      <div
                        style={{
                          margin: "20px 0px",
                        }}
                        className="addText"
                      >
                        Comment uz
                        <RichText
                          value={comentUz}
                          setValue={setComentUz}
                        ></RichText>
                      </div>
                      <div
                        style={{
                          margin: "20px 0px",
                        }}
                        className="addText"
                      >
                        Comment en
                        <RichText
                          value={comentEn}
                          setValue={setComentEn}
                        ></RichText>
                      </div>
                    </>
                  ),
                },
                {
                  key: "5",
                  label: `${t("isMain")}`,
                  children: (
                    <div>
                      <Checkbox onChange={(e) => setisMain(e.target.checked)}>
                        <p className="addText">{t("isMain")}</p>
                      </Checkbox>
                    </div>
                  ),
                },
                {
                  key: "6",
                  label: `${t("Image")}`,
                  children: (
                    <>
                      <ImgCrop rotationSlider>
                        <Upload
                          action={api + "/file/"}
                          listType="picture-card"
                          name="photo"
                          fileList={fileList}
                          onChange={onChange}
                          onPreview={onPreview}
                          onRemove={() => setPhotoId("")}
                        >
                          {fileList.length < 1 && `+ ${t("Upload")}`}
                        </Upload>
                      </ImgCrop>
                      {photoId == "" && (
                        <p
                          style={{
                            color: "red",
                          }}
                        >
                          Missig photo
                        </p>
                      )}
                    </>
                  ),
                },
              ]}
            />
          </>
        )}

        {props?.postUrl == "/word" && (
          <Collapse
            items={[
              {
                key: "1",
                label: `${t("Description")}`,
                children: (
                  <>
                    <div className="addText">
                      UZ
                      <RichText
                        value={descriptionUz}
                        setValue={setDescriptionUz}
                      ></RichText>
                    </div>
                    <div className="addText">
                      EN
                      <RichText
                        value={descriptionEn}
                        setValue={setDescriptionEn}
                      ></RichText>
                    </div>
                  </>
                ),
              },
              {
                key: "2",
                label: `${t("Comment")}`,
                children: (
                  <>
                    <div className="addText">
                      {t("Comment")} uz :
                      <RichText
                        value={comentUz}
                        setValue={setComentUz}
                      ></RichText>
                    </div>
                    <div className="addText">
                      {t("Comment")} en :
                      <RichText
                        value={comentEn}
                        setValue={setComentEn}
                      ></RichText>
                    </div>
                  </>
                ),
              },
              {
                key: "3",
                label: `${t("Image")}`,
                children: (
                  <>
                    <ImgCrop rotationSlider>
                      <Upload
                        action={api + "/file/"}
                        listType="picture-card"
                        name="photo"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        onRemove={() => setPhotoId("")}
                      >
                        {fileList.length < 1 && `+ ${t("Upload")}`}
                      </Upload>
                    </ImgCrop>
                    {photoId == "" && (
                      <p
                        style={{
                          color: "red",
                        }}
                      >
                        Missing photo
                      </p>
                    )}
                  </>
                ),
              },
            ]}
            bordered={true}
            defaultActiveKey={!photoId ? ["3"] : []}
          />
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
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
