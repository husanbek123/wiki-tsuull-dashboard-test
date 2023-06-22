/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
  Collapse,
  Form,
  Input,
  Modal,
  Space,
  Upload,
  UploadFile,
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
import styles from "./index.module.scss";
import ImgCrop from "antd-img-crop";
import TextEditor from "../../InformationRichText";
interface categorySelect {
  value: string;
  label: string;
}

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
  const { t } = useTranslation();
  // Token For Header
  const token = useToken((state) => state.token);
  // Upload Props

  // all Word Data
  const useWordData = useGetData(["word"], "/word", {});
  const useWordPatch = usePatchData(`/word/${id}`, {});
  const useMediaCategoryPatch = usePatchData(`/media-category/${id}`, {});
  const useMediaCategory = useGetData(["media-category"], "/media-category");
  // Data States
  const [isMain, setisMain] = useState(false);
  const [photoId, setPhotoId] = useState("");
  const [descriptionUz, setDescriptionUz] = useState(null);
  const [descriptionEn, setDescriptionEn] = useState(null);
  const [comentUz, setComentUz] = useState(null);
  const [comentEn, setComentEn] = useState(null);
  const [infoUz, setInfoUz] = useState<string | null>(null);
  const [infoEn, setInfoEn] = useState<string | null>(null);
  const [infos, setInfos] = useState<
    {
      key: any;
      info_uz: string;
      info_en: string;
      name_uz: string;
      name_en: string;
    }[]
  >([]);
  const [categoryData, setCategoryData] = useState<categorySelect>();
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
          category: categoryData
            ? categoryData.value
            : dataMedia.category[0]._id,
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
      console.log({
        title_uz:
          values.title_uz ||
          useGetPhrase.data?.data.find((item: any) => item._id == id)?.title_uz,
        title_en:
          values.title_en ||
          useGetPhrase?.data?.data.find((item: any) => item._id == id)
            ?.title_en,
        description_uz:
          descriptionUz ||
          useGetPhrase.data?.data.find((item: any) => item._id == id)
            ?.description_uz,
        description_en:
          descriptionEn ||
          useGetPhrase.data?.data.find((item: any) => item._id == id)
            ?.description_en,
        comment_uz:
          comentUz ||
          useGetPhrase.data?.data.find((item: any) => item._id == id)
            ?.comment_uz,
        comment_en:
          comentEn ||
          useGetPhrase.data?.data.find((item: any) => item._id == id)
            ?.comment_en,
        writers:
          values.writers ||
          useGetPhrase?.data?.data.find((item: any) => item._id == id)?.writers,
        informations:
          values.informations ||
          useGetPhrase?.data?.data.find((item: any) => item._id == id)
            ?.informations,
        image: photoId,
        isMain: isMain,
      });
      console.log(infos);

      // usePhrasePatch.mutate(
      // {
      //   title_uz: values.title_uz,
      //   title_en: values.title_en,
      //   description_uz:
      //     descriptionUz ||
      //     useGetPhrase.data?.data.find((item: any) => item._id == id)
      //       ?.description_uz,
      //   description_en:
      //     descriptionEn ||
      //     useGetPhrase.data?.data.find((item: any) => item._id == id)
      //       ?.description_en,
      //   comment_uz:
      //     comentUz ||
      //     useGetPhrase.data?.data.find((item: any) => item._id == id)
      //       ?.comments_uz,
      //   comment_en:
      //     comentEn ||
      //     useGetPhrase.data?.data.find((item: any) => item._id == id)
      //       ?.comments_en,
      //   writers: values.writers,
      //   informations: values.informations,
      //   image: photoId,
      //   isMain: isMain,
      // },
      //   {
      //     onSuccess: () => {
      //       SuccessToastify();
      //       queryClient.invalidateQueries({ queryKey: ["phrase"] });
      //       setIsModalOpen(false);
      //     },
      //     onError: () => {
      //       ErrorToastify();
      //     },
      //   }
      // );
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
    // setDescriptionEn(null);
    // setDescriptionUz(null);
    // setComentEn(null);
    // setComentUz(null);
    // setInfoUz(null);
    // setInfoEn(null);
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

  const useMediaCategoryDataId = useMediaCategory?.data?.data?.find(
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

  const [fileListPhrase, setFileListPhrase] = useState<UploadFile[]>([
    {
      uid: "0",
      name: "image.png",
      status: "done",
      url:
        api +
        "/file/" +
        useGetPhrase.data?.data.find((item: any) => item._id == id)?.image
          ?.path,
    },
  ]);
  const [fileListWords, setFileListWords] = useState<UploadFile[]>([
    {
      uid: "0",
      name: "image.png",
      status: "done",
      url:
        api +
        "/file/" +
        useWordData.data?.data.find((item: any) => item._id == id)?.image?.path,
    },
  ]);
  const onChange = ({ fileList: newFileList, file }: any) => {
    if (props.postUrl === "/phrase") {
      setFileListPhrase(newFileList);
    } else if (props.postUrl == "/word") {
      setFileListWords(newFileList);
    }
    setPhotoId(file?.response?._id);
  };

  return (
    <Modal
      title={t("update")}
      open={isModalOpen}
      width={700}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 700, width: "80%", margin: "0 auto" }}
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
            <Collapse
              items={[
                {
                  key: "1",
                  label: `${t("title")}`,
                  children: (
                    <div className={[styles.titles, "addText"].join(" ")}>
                      <Form.Item label={`${t("title")} uz`} name="title_uz">
                        <Input defaultValue={dataMedia.title_uz} />
                      </Form.Item>
                      <Form.Item label={`${"title"} en`} name="title_en">
                        <Input defaultValue={dataMedia.title_en} />
                      </Form.Item>
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: `${t("Others")}`,
                  children: (
                    <>
                      <Form.Item name="frame">
                        <Input
                          placeholder="Frame"
                          defaultValue={dataMedia.frame}
                        />
                      </Form.Item>
                      <Form.Item name="category">
                        <SELECT
                          data={useMediaCategory?.data?.data.map(
                            (item: any) => ({
                              label: item.title_uz,
                              value: item._id,
                            })
                          )}
                          defaultValue={dataMedia.category.map((item: any) => ({
                            label: item.title_uz,
                            value: item._id,
                          }))}
                          setData={setCategoryData}
                        />
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
            <>
              <Collapse
                items={[
                  {
                    key: "1",
                    label: `${t("title")}`,
                    children: (
                      <div
                        className={[styles.inputWrapper, "addText"].join(" ")}
                      >
                        <Form.Item
                          label={`${t("title")} uz`}
                          name="title_uz"
                          className={styles.Input}
                        >
                          <Input
                            defaultValue={
                              useGetPhrase.data?.data.find(
                                (item: any) => item._id == id
                              )?.title_uz
                            }
                          />
                        </Form.Item>
                        <Form.Item
                          label={`${t("title")} en`}
                          name="title_en"
                          className={styles.Input}
                        >
                          <Input
                            defaultValue={
                              useGetPhrase.data?.data.find(
                                (item: any) => item._id == id
                              )?.title_en
                            }
                          />
                        </Form.Item>
                      </div>
                    ),
                  },
                  {
                    key: "2",
                    label: `${t("writers")}`,
                    children: (
                      <Form.List name="writers">
                        {(fields, { add, remove }) => (
                          <div
                            className={[styles.inputWrapper, "addText"].join(
                              " "
                            )}
                            style={{
                              display: "grid",
                            }}
                          >
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignContent: "center",
                                }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "name"]}
                                  label={`name`}
                                  rules={[
                                    { required: true, message: "Missing" },
                                  ]}
                                >
                                  <Input placeholder="Name" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  label={`link`}
                                  name={[name, "link"]}
                                  rules={[
                                    { required: true, message: "Missing " },
                                  ]}
                                >
                                  <Input placeholder="Link" />
                                </Form.Item>
                                <MinusCircleOutlined
                                  style={{
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
                          </div>
                        )}
                      </Form.List>
                    ),
                  },
                  {
                    key: "3",
                    label: `${t("informations")}`,
                    children: (
                      <Form.List name="informations">
                        {(fields, { add, remove }) => (
                          <div>
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
                                className="addText"
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "name_uz"]}
                                  rules={[
                                    { required: true, message: "Missing" },
                                  ]}
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
                                <Form.Item
                                  {...restField}
                                  name={[name, "info_uz"]}
                                >
                                  <p className="addText">{t("informations")} uz</p>
                                  <TextEditor></TextEditor>
                                </Form.Item>
                                <Form.Item name={[name, "info_en"]}>
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
                                {t("add")}
                              </Button>
                            </Form.Item>
                          </div>
                        )}
                      </Form.List>
                    ),
                  },
                  {
                    key: "4",
                    label: `${t("Description")}`,
                    children: (
                      <>
                        <div
                          style={{
                            margin: "20px 0px",
                          }}
                          className="addText"
                        >
                          UZ
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
                          className="addText"
                        >
                          EN
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
                      </>
                    ),
                  },
                  {
                    key: "5",
                    label: `${t("Comment")}`,
                    children: (
                      <>
                        <div
                          style={{
                            margin: "20px 0px",
                          }}
                          className="addText"
                        >
                          {t("Comment")} uz
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
                          className="addText"
                        >
                          {t("Comment")} en
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
                      </>
                    ),
                  },
                  {
                    key: "6",
                    label: `${t("isMain")}`,
                    children: (
                      <Checkbox
                        checked={isMain}
                        onChange={(e) => setisMain(e.target.checked)}
                      >
                        <p className="addText">{t("isMain")}</p>
                      </Checkbox>
                    ),
                  },
                  {
                    key: "7",
                    label: `${t("Image")}`,
                    children: (
                      <ImgCrop rotationSlider>
                        <Upload
                          headers={{
                            Authorization: `Bearer ${token}`,
                          }}
                          action={api + "/file"}
                          listType="picture-card"
                          fileList={fileListPhrase}
                          onChange={onChange}
                          onPreview={onPreview}
                          name="photo"
                        >
                          {fileListPhrase.length < 1 && "+ Upload"}
                        </Upload>
                      </ImgCrop>
                    ),
                  },
                ]}
              />
            </>
          </>
        )}

        {props.postUrl == "/word" && (
          <>
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: `${t("title")}`,
                  children: (
                    <div className={styles.inputWrapper}>
                      <Form.Item name={"title_uz"} className={styles.Input}>
                        <Input
                          placeholder={t("title_uz")}
                          defaultValue={useWordGetData?.title_uz}
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                      <Form.Item className={styles.Input} name={"title_en"}>
                        <Input
                          placeholder={t("title_en")}
                          defaultValue={useWordGetData?.title_en}
                          style={{
                            width: "100%",
                          }}
                          required
                        />
                      </Form.Item>
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: `${t("Comment")}`,
                  children: (
                    <div className={styles.inputWrapper}>
                      <div
                        style={{
                          margin: "20px 0px",
                        }}
                        className="addText"
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
                        <div
                          style={{
                            margin: "20px 0px",
                          }}
                          className="addText"
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
                      </div>
                    </div>
                  ),
                },
                {
                  key: "3",
                  label: `${t("Description")}`,
                  children: (
                    <div className={styles.inputWrapper}>
                      <div className="addText">
                        UZ
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
                      <div className="addText">
                        EN
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
                    </div>
                  ),
                },
                {
                  key: "4",
                  label: `${t("Image")}`,
                  children: (
                    <div className={styles.inputWrapper}>
                      <Form.Item
                        required
                        rules={[{ required: true, message: "Missing" }]}
                      >
                        <ImgCrop rotationSlider>
                          <Upload
                            action={api + "/file"}
                            headers={{
                              Authorization: `Bearer ${token}`,
                            }}
                            listType="picture-card"
                            fileList={fileListWords}
                            onChange={onChange}
                            name="photo"
                            onPreview={onPreview}
                          >
                            {fileListWords.length < 1 && "+ Upload"}
                          </Upload>
                        </ImgCrop>
                      </Form.Item>
                    </div>
                  ),
                },
              ]}
            />
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
            justifyContent: "end",
            marginTop: "30px",
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
