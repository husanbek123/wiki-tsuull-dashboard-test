/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
  Form,
  Input,
  Upload,
  Modal,
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
import { useQueryClient } from "@tanstack/react-query";
import { postUrl } from "../../../types/defaultType";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../utils/zustand/useLanguage";
import RichTextEditor from "../../RichTextEditor";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
  const [data, setData] = useState<IData[] | null>(null);
  const [categoryData, setCategoryData] = useState<IData>({
    value: null,
    label: null,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    fields: writers,
    prepend: writersAppend,
    remove: writersRemove,
  } = useFieldArray({ control, name: "writers" });
  const {
    fields: informations,
    append: informationsAppend,
    remove: informationsRemove,
  } = useFieldArray({
    control,
    name: "informations",
  });

  const [isMain, setIsMain] = useState(false);
  const [photoId, setPhotoId] = useState<string>("");

  const handleCancel = () => {
    setIsModalOpen(false);
    setData(null);
  };

  const language = useLanguage((state) => state.langauge);
  const queryClient = useQueryClient();

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

  return (
    <Modal
      width={1000}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      wrapClassName="modal"
    >
      <form
        onSubmit={handleSubmit((values: any) => {
          if (
            fileList.length == 0 &&
            ["/word", "/phrase"].includes(props.postUrl)
          ) {
            return ErrorToastify(t("FillInTheBlanks"));
          } else {
            if (props.postUrl == "/media") {
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
            } else if (props.postUrl == "/phrase") {
              usePost.mutate(
                {
                  ...values,

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
        })}
      >
        {["/media", "/media-category"].includes(props.postUrl) ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <label>
              <Controller
                render={({ field }) => (
                  <Input {...field} placeholder={`${t("title")} uz`} />
                )}
                name={`title_uz`}
                control={control}
                rules={{ required: true }}
              />
              {errors.title_uz && <p className="errorText">{t("Missing")}</p>}
            </label>

            <label>
              <Controller
                render={({ field }) => (
                  <Input {...field} placeholder={`${t("title")} en`} />
                )}
                name={`title_en`}
                control={control}
                rules={{ required: true }}
              />
              {errors.title_en && <p className="errorText">{t("Missing")}</p>}
            </label>
          </div>
        ) : (
          <Collapse
            expandIcon={() => ""}
            activeKey={"1"}
            items={[
              {
                key: "1",
                label: `${t("title")}`,

                children: (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <label>
                      <Controller
                        render={({ field }) => (
                          <Input {...field} placeholder={`${t("title")} uz`} />
                        )}
                        name={`title_uz`}
                        control={control}
                        rules={{ required: true }}
                      />
                      {errors.title_uz && (
                        <p className="errorText">{t("Missing")}</p>
                      )}
                    </label>

                    <label>
                      <Controller
                        render={({ field }) => (
                          <Input {...field} placeholder={`${t("title")} en`} />
                        )}
                        name={`title_en`}
                        control={control}
                        rules={{ required: true }}
                      />
                      {errors.title_en && (
                        <p className="errorText">{t("Missing")}</p>
                      )}
                    </label>
                  </div>
                ),
              },
            ]}
          />
        )}

        {props.postUrl == "/media" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <label>
              <Controller
                render={({ field }) => <Input {...field} placeholder="frame" />}
                name={`frame`}
                control={control}
                rules={{ required: true }}
              />
              {errors.frame && <p className="errorText">{t("Missing")}</p>}
            </label>
            <label>
              <Controller
                render={({ field }) => (
                  <SELECT data={data} setData={setCategoryData} {...field} />
                )}
                rules={{
                  required: categoryData?.value == null ? true : false,
                }}
                name={`category`}
                control={control}
              />
              {categoryData?.value == null && (
                <p className="errorText">{t("Missing")}</p>
              )}
            </label>
          </div>
        )}

        {props.postUrl == "/phrase" && (
          <>
            <Collapse
              expandIcon={() => ""}
              activeKey={"123456789".split("")}
              items={[
                {
                  key: "1",
                  label: `${t("writers")}`,
                  children: (
                    <ul
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexDirection: "column",
                      }}
                    >
                      {writers.map((item, index) => (
                        <li key={item.id}>
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                            }}
                          >
                            <label style={{ width: "100%" }}>
                              <Controller
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    placeholder={`${t("name")}`}
                                  />
                                )}
                                name={`writers.${index}.name`}
                                control={control}
                              />
                            </label>
                            <label style={{ width: "100%" }}>
                              <Controller
                                render={({ field }) => (
                                  <Input {...field} placeholder={`link`} />
                                )}
                                name={`writers.${index}.link`}
                                control={control}
                                rules={{ required: true }}
                              />
                            </label>
                            <Button
                              type="primary"
                              htmlType="button"
                              onClick={() => writersRemove(index)}
                              style={{
                                background: "red",
                              }}
                            >
                              {t("delete")}
                            </Button>
                          </div>
                        </li>
                      ))}
                      <Button
                        type="primary"
                        htmlType="button"
                        onClick={() =>
                          writersAppend({
                            name: "",
                            link: "",
                          })
                        }
                        style={{
                          background: "#ec781c",
                        }}
                      >
                        {t("addWriter")}
                      </Button>
                    </ul>
                  ),
                },
                {
                  key: "2",
                  label: "Information",
                  children: (
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexDirection: "column",
                      }}
                    >
                      {informations.map((item, index) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            gap: "20px",
                            flexDirection: "column",
                          }}
                        >
                          <label style={{ width: "100%" }}>
                            <Controller
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder={`${t("name")} uz`}
                                />
                              )}
                              name={`informations.${index}.name_uz`}
                              control={control}
                            />
                          </label>
                          <label style={{ width: "100%" }}>
                            <Controller
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder={`${t("name")} en`}
                                />
                              )}
                              name={`informations.${index}.name_en`}
                              control={control}
                            />
                          </label>
                          <Controller
                            render={({ field }) => (
                              <RichTextEditor
                                {...field}
                                placeholder={`${t("Informations")} uz`}
                                onChange={field.onChange}
                              />
                            )}
                            name={`informations.${index}.info_uz`}
                            control={control}
                          />
                          <label style={{ width: "100%" }}>
                            <Controller
                              render={({ field }) => (
                                <RichTextEditor
                                  {...field}
                                  placeholder={`${t("Informations")} en`}
                                  onChange={field.onChange}
                                />
                              )}
                              name={`informations.${index}.info_en`}
                              control={control}
                            />
                          </label>
                          <Button
                            type="primary"
                            htmlType="button"
                            onClick={() => informationsRemove(index)}
                            style={{
                              background: "red",
                              marginBottom: "30px",
                            }}
                          >
                            {t("delete")}
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="primary"
                        htmlType="button"
                        style={{
                          background: "#ec781c",
                        }}
                        onClick={() =>
                          informationsAppend({
                            name_uz: "",
                            name_en: "",
                            info_uz: "",
                            info_en: "",
                          })
                        }
                      >
                        {t("add")}
                      </Button>
                    </div>
                  ),
                },
                {
                  key: "3",
                  label: `${t("Description")}`,
                  children: (
                    <>
                      <div>
                        <p className="addText"> {t("Description")} uz</p>
                        <Controller
                          render={({ field }) => (
                            <RichTextEditor
                              {...field}
                              placeholder={`${t("Informations")} uz`}
                              onChange={field.onChange}
                            />
                          )}
                          name={`description_uz`}
                          control={control}
                          rules={{ required: true }}
                        />
                      </div>
                      <div>
                        <p className="addText"> {t("Description")} en</p>
                        <Controller
                          render={({ field }) => (
                            <RichTextEditor
                              {...field}
                              placeholder={`${t("Informations")} en`}
                              onChange={field.onChange}
                            />
                          )}
                          name={`description_en`}
                          control={control}
                          rules={{ required: true }}
                        />
                      </div>
                    </>
                  ),
                },
                {
                  key: "4",
                  label: `${t("Comment")}`,
                  children: (
                    <div>
                      <label
                        style={{
                          width: "100%",
                        }}
                      >
                        <p className="addText"> {t("Comment")} uz</p>
                        <Controller
                          render={({ field }) => (
                            <RichTextEditor
                              {...field}
                              placeholder={`${t("Informations")} uz`}
                              onChange={field.onChange}
                            />
                          )}
                          name={`comment_uz`}
                          control={control}
                          rules={{ required: true }}
                        />
                        {errors.comment_uz && (
                          <p className="errorText">{t("Missing")}</p>
                        )}
                      </label>
                      <label
                        style={{
                          width: "100%",
                        }}
                      >
                        <p className="addText"> {t("Comment")} en</p>
                        <Controller
                          render={({ field }) => (
                            <RichTextEditor
                              {...field}
                              placeholder={`${t("Informations")} en`}
                              onChange={field.onChange}
                            />
                          )}
                          name={`comment_en`}
                          control={control}
                          rules={{ required: true }}
                        />
                        {errors.comment_en && (
                          <p className="errorText">{t("Missing")}</p>
                        )}
                      </label>
                    </div>
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
                      <Form.Item>
                        <ImgCrop rotationSlider>
                          <Upload
                            action={api + "/file/"}
                            listType="picture-card"
                            name="photo"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            onRemove={() => {
                              setPhotoId("");
                            }}
                          >
                            {fileList.length < 1 && `+ ${t("Upload")}`}
                          </Upload>
                        </ImgCrop>
                      </Form.Item>

                      <p
                        style={{
                          color: fileList.length == 0 ? "red" : "green",
                        }}
                      >
                        {fileList.length == 0
                          ? t("MissingPhoto")
                          : t("PhotoIsFilled")}
                      </p>
                    </>
                  ),
                },
              ]}
            />
          </>
        )}

        {props.postUrl == "/word" && (
          <Collapse
            expandIcon={() => ""}
            activeKey={"123456789".split("")}
            items={[
              {
                key: "1",
                label: `${t("Description")}`,
                children: (
                  <>
                    <div className="addText">
                      <label>
                        <p className="addText"> {t("Description")} uz</p>
                        <Controller
                          render={({ field }) => (
                            <RichTextEditor
                              {...field}
                              placeholder={`${t("Description")} uz`}
                              onChange={field.onChange}
                            />
                          )}
                          name={`description_uz`}
                          control={control}
                          rules={{ required: true }}
                        />
                        {errors.description_uz && (
                          <p className="errorText">{t("Missing")}</p>
                        )}
                      </label>
                    </div>
                    <label>
                      <p className="addText"> {t("Description")} en </p>
                      <Controller
                        render={({ field }) => (
                          <RichTextEditor
                            {...field}
                            onChange={field.onChange}
                          />
                        )}
                        name={`description_en`}
                        control={control}
                        rules={{ required: true }}
                      />
                      {errors.description_en && (
                        <p className="errorText">{t("Missing")}</p>
                      )}
                    </label>
                  </>
                ),
              },
              {
                key: "2",
                label: `${t("Comment")}`,
                children: (
                  <>
                    <label>
                      <p className="addText"> {t("Comment")} uz</p>
                      <Controller
                        render={({ field }) => (
                          <RichTextEditor
                            {...field}
                            onChange={field.onChange}
                          />
                        )}
                        name={`comment_uz`}
                        control={control}
                        rules={{ required: true }}
                      />
                      {errors.comment_uz && (
                        <p className="errorText">{t("Missing")}</p>
                      )}
                    </label>
                    <label>
                      <p className="addText"> {t("Comment")} en</p>
                      <Controller
                        render={({ field }) => (
                          <RichTextEditor
                            {...field}
                            onChange={field.onChange}
                          />
                        )}
                        name={`comment_en`}
                        control={control}
                        rules={{ required: true }}
                      />
                      {errors.comment_en && (
                        <p className="errorText">{t("Missing")}</p>
                      )}
                    </label>
                  </>
                ),
              },
              {
                key: "3",
                label: `${t("Image")}`,
                children: (
                  <>
                    <label>
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
                      {fileList.length == 0 && (
                        <p className="errorText">{t("MissingPhoto")}</p>
                      )}
                    </label>
                  </>
                ),
              },
            ]}
            bordered={true}
          />
        )}
        <Button
          type="primary"
          // onClick={onFinish}
          htmlType="submit"
          style={{
            width: "100%",
            marginTop: "30px",
          }}
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
}
