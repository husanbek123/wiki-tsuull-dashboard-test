/* eslint-disable @typescript-eslint/no-unused-vars */
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
import TextEditor from "../../InformationRichText";
import { useLanguage } from "../../../utils/zustand/useLanguage";
import { useCategoryId } from "../../../utils/zustand/useMediaCategoryId";
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
  const usePostMediaCategory = usePostData("media-category");
  const categoryId = useCategoryId((state) => state.id);
  const setCategoryId = useCategoryId((state) => state.setId);
  const usePost = usePostData(`${props.postUrl}`);
  const [data, setData] = useState<IData[] | null>(null);
  const [categoryData, setCategoryData] = useState<IData>({
    value: null,
    label: null,
  });
  const [isMain, setIsMain] = useState(false);
  const [photoId, setPhotoId] = useState<string>("");
  const [descriptionUz, setDescriptionUz] = useState<string>("");
  const [descriptionEn, setDescriptionEn] = useState<string>("");
  const [commentUz, setCommentUz] = useState<string>("");
  const [commentEn, setCommentEn] = useState<string>("");
  const handleCancel = () => {
    setIsModalOpen(false);
    setData(null);
  };
  const language = useLanguage((state) => state.langauge);
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

  const onFinish = async (values: any) => {
    if (photoId === "" && ["/word", "/phrase"].includes(props.postUrl)) {
      return ErrorToastify(t("FillInTheBlanks"));
    } else {
      // media
      if (props.postUrl == "/media") {
        if (categoryData.value) {
          usePost.mutate(
            {
              ...values,
              category: categoryData.value,
            },
            {
              onSuccess: () => {
                SuccessToastify(t("Success"));
                setIsModalOpen(false);
                setData(null);
                queryClient.invalidateQueries({
                  queryKey: ["media"],
                });
              },
              onError: () => {
                ErrorToastify(t("Error"));
              },
            }
          );
        } else {
          if (categoryId == "") {
            await usePostMediaCategory.mutate(
              {
                title_uz: "Boshqalar",
                title_en: "Others",
              },
              {
                onSuccess: (data) => {
                  setCategoryId(data.data._id);
                  SuccessToastify(t("Success"));
                  setIsModalOpen(false);
                  setData(null);
                  queryClient.invalidateQueries({
                    queryKey: ["media-category", "media"],
                  });
                },
                onError: () => {
                  ErrorToastify(t("Error"));
                },
              }
            );
            await usePost.mutate(
              {
                ...values,
                category: categoryId,
              },
              {
                onSuccess: () => {
                  SuccessToastify(t("Success"));
                  setIsModalOpen(false);
                  setData(null);
                  queryClient.invalidateQueries({
                    queryKey: ["media-category"],
                  });
                  queryClient.invalidateQueries({
                    queryKey: ["media"],
                  });
                },
                onError: () => {
                  ErrorToastify(t("Error"));
                },
              }
            );
          } else {
            usePost.mutate(
              {
                ...values,
                category: categoryId,
              },
              {
                onSuccess: () => {
                  SuccessToastify(t("Success"));
                  setIsModalOpen(false);
                  setData(null);
                  queryClient.invalidateQueries({
                    queryKey: ["media"],
                  });
                },
                onError: () => {
                  ErrorToastify(t("Error"));
                },
              }
            );
          }
        }
      } else if (props.postUrl == "/phrase") {
        usePost.mutate(
          {
            ...values,
            comment_uz: commentUz || "",
            comment_en: commentEn || "",
            description_uz: descriptionUz || "",
            description_en: descriptionEn || "",
            informations:
              values?.informations?.map((item: any) => ({
                info_uz: item.info_uz || "",
                info_en: item.info_en || "",
                name_uz: item.name_uz || "",
                name_en: item.name_en || "",
              })) || [],
            writers: values.writers || [],
            isMain,
            image: photoId,
          },
          {
            onSuccess: () => {
              SuccessToastify(t("Success"));
              setIsModalOpen(false);
              queryClient.invalidateQueries({
                queryKey: ["phrase"],
              });
            },
            onError: () => {
              ErrorToastify(t("Error"));
            },
          }
        );
      } else if (props.postUrl == "/word") {
        const result = {
          ...values,
          comment_uz: commentUz,
          comment_en: commentEn,
          description_uz: descriptionUz,
          description_en: descriptionEn,
          image: photoId,
        };
        usePost.mutate(result, {
          onSuccess: () => {
            SuccessToastify(t("Success"));
            setIsModalOpen(false);
            queryClient.invalidateQueries({
              queryKey: ["word"],
            });
          },
          onError: () => {
            ErrorToastify(t("Error"));
          },
        });
      } else if (props.postUrl == "/media-category") {
        usePost.mutate(
          {
            ...values,
          },
          {
            onSuccess: () => {
              SuccessToastify(t("Success"));
              setIsModalOpen(false);
              queryClient.invalidateQueries({
                queryKey: ["media-category"],
              });
            },
            onError: () => {
              ErrorToastify(t("Error"));
            },
          }
        );
      }
    }
    return;
  };

  const onFinishFailed = () => {
    ErrorToastify(t("FillInTheBlanks"));
  };

  if (useGetCategory.isSuccess && data == null) {
    for (let i = 0; i < useGetCategory.data.data.length; i++) {
      const category = useGetCategory.data.data[i];
      setData((prev: any) =>
        prev
          ? [
              ...prev,
              {
                value: category._id,
                label:
                  language === "uz" ? category.title_uz : category.title_en,
              },
            ]
          : [
              {
                value: category._id,
                label:
                  language === "uz" ? category.title_uz : category.title_en,
              },
            ]
      );
    }
  }

<<<<<<< HEAD


  const [activeKey, setActiveKey] = useState<string[]>(['1']);

  function handleClick(key: any) {
    setActiveKey(key);
  }
=======
  // colaspaceOnChange

  const colaspaceOnChange = (e: any) => {
    console.log(e);
  };
>>>>>>> c373c7a4588ea36ab26d5f88e246a8db66791ca2



  return (
    <Modal
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
        {["/media", "/media-category"].includes(props.postUrl) ? (
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
        ) : (
          <Collapse
            accordion={true}
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
        )}

        {props.postUrl == "/media" && (
          <>
            <Form.Item
              label="Frame"
              name="frame"
              rules={[{ required: true, message: "Please enter" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item required={true} label="Category" name="category">
              <SELECT data={data} setData={setCategoryData} />
            </Form.Item>
          </>
        )}

        {props.postUrl == "/phrase" && (
          <>
            <Collapse
              defaultActiveKey={photoId === "" ? ["6"] : []}
              accordion
              activeKey={activeKey}
              onChange={handleClick}
              items={[
                {
                  key: "1",
                  label: `${t("writers")}`,
                  children: (
                    <Form.List
                      rules={[
                        {
                          validator(rule, _value, _callback) {
                            (rule.required = true),
                              (this.message = t("Missing"));
                          },
                        },
                      ]}
                      name="writers"
                    >
                      {(fields, { add, remove }) => {
                        console.log("add Function", add);
                        return (
                          <>
                            {fields.map(({ key, name, ...restField }) => {
                              console.log(key, name);
                              return (
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
                                    rules={[
                                      {
                                        required: true,
                                        message: t("Missing"),
                                      },
                                    ]}
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
                                      {
                                        required: true,
                                        message: t("Missing"),
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Link" />
                                  </Form.Item>
                                  <MinusCircleOutlined
                                    onClick={() => remove(name)}
                                  />
                                </Space>
                              );
                            })}
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
                        );
                      }}
                    </Form.List>
                  ),
                },
                {
                  key: "2",
                  label: "Information",
                  children: (
                    <Form.List
                      rules={[
                        {
                          validator(rule, _value, _callback) {
                            (rule.required = true),
                              (this.message = t("Missing"));
                          },
                        },
                      ]}
                      name="informations"
                    >
                      {(fields, { add, remove }) => {
                        return (
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
                                  rules={[
                                    {
                                      required: true,
                                      message: t("Missing"),
                                    },
                                  ]}
                                >
                                  <Input placeholder={`${t("name")} uz`} />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "name_en"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: t("Missing"),
                                    },
                                  ]}
                                >
                                  <Input placeholder={`${t("name")} en`} />
                                </Form.Item>
<<<<<<< HEAD
                                <Form.Item rules={[{ required: true, message: t("Missing") }]} name={[name, "info_uz"]}>
                                  <TextEditor></TextEditor>
                                </Form.Item>
                                <Form.Item rules={[{ required: true, message: t("Missing") }]} name={[name, "info_en"]}>
=======
                                <Form.Item
                                  rules={[
                                    { required: true, message: t("Missing") },
                                  ]}
                                  name={[name, "info_uz"]}
                                >
                                  <TextEditor></TextEditor>
                                </Form.Item>
                                <Form.Item
                                  rules={[
                                    { required: true, message: t("Missing") },
                                  ]}
                                  name={[name, "info_en"]}
                                >
>>>>>>> c373c7a4588ea36ab26d5f88e246a8db66791ca2
                                  <TextEditor></TextEditor>
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
<<<<<<< HEAD
                        )
=======
                        );
>>>>>>> c373c7a4588ea36ab26d5f88e246a8db66791ca2
                      }}
                    </Form.List>
                  ),
                },
                {
                  key: "3",
                  label: `${t("Description")}`,
                  children: (
                    <>
                      <div
                        style={{
                          margin: "20px 0px",
                        }}
                        className="addText"
                      >
                        <Form.Item
                          rules={[{ required: true, message: t("Missing") }]}
                        >
                          {t("Description")} uz
                          <RichText
                            value={descriptionUz}
                            setValue={setDescriptionUz}
                          ></RichText>
                        </Form.Item>
                      </div>
                      <div
                        style={{
                          margin: "20px 0px",
                        }}
                        className="addText"
                      >
                        <Form.Item
                          required={true}
                          rules={[{ required: true, message: t("Missing") }]}
                        >
                          {t("Description")} en
                          <RichText
                            value={descriptionEn}
                            setValue={setDescriptionEn}
                          ></RichText>
                        </Form.Item>
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
                        <Form.Item
                          required={true}
                          rules={[{ required: true, message: t("Missing") }]}
                        >
                          Comment uz
                          <RichText
                            value={commentUz}
                            setValue={setCommentUz}
                          ></RichText>
                        </Form.Item>
                      </div>
                      <div
                        style={{
                          margin: "20px 0px",
                        }}
                        className="addText"
                      >
                        Comment en
                        <RichText
                          value={commentEn}
                          setValue={setCommentEn}
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
                      <Checkbox onChange={(e) => setIsMain(e.target.checked)}>
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
                          {t("MissingPhoto")}
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
            accordion
            items={[
              {
                key: "1",
                label: `${t("Description")}`,
                children: (
                  <>
                    <div className="addText">
                      {t("Description")} uz
                      <RichText
                        value={descriptionUz}
                        setValue={setDescriptionUz}
                      ></RichText>
                    </div>
                    <div className="addText">
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
                key: "2",
                label: `${t("Comment")}`,
                children: (
                  <>
                    <div className="addText">
                      {t("Comment")} uz
                      <RichText
                        value={commentUz}
                        setValue={setCommentUz}
                      ></RichText>
                    </div>
                    <div className="addText">
                      {t("Comment")} en
                      <RichText
                        value={commentEn}
                        setValue={setCommentEn}
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
                        {t("MissingPhoto")}
                      </p>
                    )}
                  </>
                ),
              },
            ]}
            bordered={true}
            // defaultActiveKey={!photoId ? ["3"] : []}
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
