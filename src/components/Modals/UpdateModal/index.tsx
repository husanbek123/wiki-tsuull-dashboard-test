/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Space,
  Upload,
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
export function Update(props: {
  id: string | number;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  postUrl: postUrl;
}) {
  const { id, setIsModalOpen, isModalOpen } = props;
  const useMediaPatch = usePatchData(`/media/${id}`, {});
  const usePhrasePatch = usePatchData(`/phrase/${id}`, {});
  const useGetMedia = useGetData(["media"], "/media", {});
  const useGetPhrase = useGetData(["phrase"], "/phrase", {});
  const [category, setCategory] = useState<{ value: string; label: string }[]>(
    []
  );

  const token = useToken((state) => state.token);
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

  const [isMain, setisMain] = useState(false);
  const [photoId, setPhotoId] = useState("");
  const [descriptionUz, setDescriptionUz] = useState(null);
  const [descriptionEn, setDescriptionEn] = useState(null);
  const [comentUz, setComentUz] = useState(null);
  const [comentEn, setComentEn] = useState(null);

  const queryClient = useQueryClient();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    if (props.postUrl === "/media") {
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
    console.log({
      title_uz: values.title_uz,
      title_en: values.title_en,
      description_uz:
        descriptionUz ||
        useGetPhrase.data?.data.find((item: any) => item._id == id)
          ?.destiption_uz,
      description_en:
        descriptionEn ||
        useGetPhrase.data?.data.find((item: any) => item._id == id)
          ?.description_en,
      comment_uz:
        comentUz ||
        useGetPhrase.data?.data.find((item: any) => item._id == id)?.comment_uz,
      comment_en:
        comentEn ||
        useGetPhrase.data?.data.find((item: any) => item._id == id)?.comment_en,
      writers: values.writers,
      informations: values.informations,
      image: photoId,
      isMain: isMain,
    });
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

  if (useGetPhrase.isSuccess && photoId?.trim() == "") {
    setPhotoId(
      useGetPhrase.data?.data.find((item: any) => item._id == id)?.image._id
    );
    setisMain(
      useGetPhrase.data?.data.find((item: any) => item._id == id)?.isMain
    );
  }

  return  (
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
