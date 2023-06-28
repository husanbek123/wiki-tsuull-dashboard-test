/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
  Collapse,
  Form,
  Input,
  Modal,
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
import { api } from "../../../utils/axios";
import { useTranslation } from "react-i18next";
import { RcFile } from "antd/es/upload";
import ImgCrop from "antd-img-crop";
import { useLanguage } from "../../../utils/zustand/useLanguage";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import RichTextEditor from "../../RichTextEditor";
interface IData {
  label: string | null;
  value: string | null;
  isFixed?: boolean;
}
interface categorySelect {
  value: string | null;
  label: string | null;
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
  const [data, setData] = useState<IData[] | null>(null);
  // all Word Data
  const useWordData = useGetData(["word"], "/word", {});
  const useWordPatch = usePatchData(`/word/${id}`, {});
  const useMediaCategoryPatch = usePatchData(`/media-category/${id}`, {});
  const useMediaCategory = useGetData(["media-category"], "/media-category");
  // Data States
  const [photoId, setPhotoId] = useState("");

  const [categoryData, setCategoryData] = useState<categorySelect>({
    value: null,
    label: null,
  });
  // QueryClient For Real Time
  const queryClient = useQueryClient();
  // Modal Functions
  const dataWord = useWordData?.data?.data?.find(
    (item: { _id: string }) => item._id === id
  );

  const dataMedia = useGetMedia?.data?.data?.find(
    (item: { _id: string }) => item._id === id
  );
  const language = useLanguage((state) => state.langauge);

  const dataMediaCategory = useMediaCategory?.data?.data?.find(
    (item: { _id: string }) => item._id === id
  );

  const dataPhrase = useGetPhrase?.data?.data?.find(
    (item: any) => item._id === id
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      writers: dataPhrase?.writers,
      informations: dataPhrase?.informations,
      phrase: {
        title_uz: dataPhrase?.title_uz,
        title_en: dataPhrase?.title_en,
        description_uz: dataPhrase?.description_uz,
        description_en: dataPhrase?.description_en,
        comment_uz: dataPhrase?.comment_uz,
        comment_en: dataPhrase?.comment_en,
      },
      media: {
        title_uz: dataMedia?.title_uz,
        title_en: dataMedia?.title_en,
        frame: dataMedia?.frame,
        category: data?.find(
          (item) => item?.value == dataMedia?.category?.[0]?._id
        ),
      },
      word: {
        title_uz: dataWord?.title_uz,
        title_en: dataWord?.title_en,
        description_uz: dataWord?.description_uz,
        description_en: dataWord?.description_en,
        comment_uz: dataWord?.comment_uz,
        comment_en: dataWord?.comment_en,
      },
      mediaCategory: {
        title_uz: dataMediaCategory?.title_uz,
        title_en: dataMediaCategory?.title_en,
      },
    },
  });
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
  console.log(categoryData);

  if (useMediaCategory.isSuccess && data == null) {
    setCategoryData({
      value: dataMedia?.category?.[0]?._id,
      label: language === "uz" ? dataMedia?.title_uz : dataMedia.title_en,
    });
    for (let i = 0; i < useMediaCategory.data.data.length; i++) {
      const category = useMediaCategory.data.data[i];
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
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      wrapClassName="modal"
    >
      <form
        onSubmit={handleSubmit((values: any) => {
          if (["/phrase", "/word"].includes(props.postUrl)) {
            if (fileListPhrase.length == 0 || fileListWords.length == 0) {
              return ErrorToastify("FillInTheBlanks");
            }
          }
          if (props.postUrl === "/media") {
            useMediaPatch.mutate(
              {
                title_uz:
                  values.title_uz !== undefined
                    ? values.title_uz
                    : dataMedia.title_uz,
                title_en:
                  values.title_en !== undefined
                    ? values.title_en
                    : dataMedia.title_en,
                frame:
                  values.frame !== undefined ? values.frame : dataMedia.frame,
                category: categoryData
                  ? categoryData.value
                  : dataMedia.category[0]._id,
              },
              {
                onSuccess: () => {
                  SuccessToastify(t("Success"));
                  queryClient.invalidateQueries({ queryKey: ["media"] });
                  setIsModalOpen(false);
                },
                onError: () => {
                  ErrorToastify(t("Error"));
                },
              }
            );
          } else if (props.postUrl === "/phrase") {
            usePhrasePatch.mutate(
              {
                title_uz:
                  values.title_uz !== undefined
                    ? values.title_uz
                    : useGetPhrase.data?.data.find(
                        (item: any) => item._id == id
                      )?.title_uz,
                title_en:
                  values.title_en !== undefined
                    ? values.title_en
                    : useGetPhrase?.data?.data.find(
                        (item: any) => item._id == id
                      )?.title_en,
                description_uz:
                  values.description_uz ||
                  useGetPhrase.data?.data.find((item: any) => item._id == id)
                    ?.description_uz,
                description_en:
                  values.description_en ||
                  useGetPhrase.data?.data.find((item: any) => item._id == id)
                    ?.description_en,
                comment_uz:
                  values.comment_uz ||
                  useGetPhrase.data?.data.find((item: any) => item._id == id)
                    ?.comment_uz,
                comment_en:
                  values.comment_en ||
                  useGetPhrase.data?.data.find((item: any) => item._id == id)
                    ?.comment_en,
                writers:
                  values.writers ||
                  useGetPhrase?.data?.data.find((item: any) => item._id == id)
                    ?.writers,
                informations:
                  values.informations ||
                  useGetPhrase?.data?.data.find((item: any) => item._id == id)
                    ?.informations,
                image:
                  photoId ||
                  useGetPhrase?.data?.data.find((item: any) => item._id == id)
                    .image._id,
                isMain: values.isMain || dataPhrase.isMain,
              },
              {
                onSuccess: () => {
                  SuccessToastify(t("Success"));
                  queryClient.invalidateQueries({ queryKey: ["phrase"] });
                  setIsModalOpen(false);
                },
                onError: () => {
                  ErrorToastify(t("Error"));
                },
              }
            );
          } else if (props.postUrl === "/word") {
            useWordPatch.mutate(
              {
                title_uz: values.title_uz,
                title_en: values.title_en,
                description_uz: values?.description_uz,
                description_en: values?.description_en,
                comment_uz: values?.comment_uz,
                comment_en: values?.comment_en,
                image: photoId || dataWord.image._id,
              },
              {
                onSuccess: () => {
                  SuccessToastify(t("Success"));
                  queryClient.invalidateQueries({ queryKey: ["word"] });
                  setIsModalOpen(false);
                },
                onError: () => {
                  ErrorToastify(t("Error"));
                },
              }
            );
          } else if (props.postUrl === "/media-category") {
            useMediaCategoryPatch.mutate(
              {
                title_uz: values.title_uz,
                title_en: values.title_en,
              },
              {
                onSuccess: () => {
                  SuccessToastify(t("Success"));
                  queryClient.invalidateQueries({
                    queryKey: ["media-category"],
                  });
                  setIsModalOpen(false);
                },
                onError: () => {
                  ErrorToastify(t("Error"));
                },
              }
            );
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
                defaultValue={
                  props.postUrl === "/media"
                    ? dataMedia?.title_uz
                    : dataMediaCategory?.title_uz
                }
                name="title_uz"
                control={control}
                rules={{ required: true }}
              />
              {errors?.title_uz && <p className="errorText">{t("Missing")}</p>}
            </label>

            <label>
              <Controller
                render={({ field }) => (
                  <Input {...field} placeholder={`${t("title")} en`} />
                )}
                defaultValue={
                  props.postUrl === "/media"
                    ? dataMedia?.title_en
                    : dataMediaCategory?.title_en
                }
                name={`title_en`}
                control={control}
                rules={{ required: true }}
              />
              {errors?.title_en ? (
                <p className="errorText">{t("Missing")}</p>
              ) : (
                ""
              )}
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
                        defaultValue={
                          props.postUrl === "/phrase"
                            ? dataPhrase?.title_uz
                            : dataWord?.title_uz
                        }
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
                        defaultValue={
                          props.postUrl === "/phrase"
                            ? dataPhrase?.title_en
                            : dataWord?.title_en
                        }
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
                name={`media.frame`}
                control={control}
                rules={{ required: true }}
                defaultValue={dataMedia?.frame}
              />
              {errors?.frame && <p className="errorText">{t("Missing")}</p>}
            </label>
            <label>
              <Controller
                render={({ field }) => (
                  <SELECT
                    data={data}
                    setData={setCategoryData}
                    {...field}
                    defaultValue={data?.find(
                      (item) => item?.value == dataMedia?.category?.[0]?._id
                    )}
                  />
                )}
                name={`media.category`}
                control={control}
                rules={{
                  required: categoryData?.value == null ? true : false,
                }}
              />
              {categoryData?.value == null ? (
                <p className="errorText">{t("Missing")}</p>
              ) : (
                <></>
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
                                name={`writers.${index}.name`}
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    placeholder={`${t("name")}`}
                                  />
                                )}
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
                                defaultValue={item?.info_uz}
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
                                  defaultValue={item?.info_en}
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
                              defaultValue={dataPhrase.description_uz}
                            />
                          )}
                          defaultValue={dataPhrase.description_uz}
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
                              defaultValue={dataPhrase.description_en}
                            />
                          )}
                          defaultValue={dataPhrase.description_en}
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
                              defaultValue={dataPhrase.comment_uz}
                            />
                          )}
                          defaultValue={dataPhrase.comment_uz}
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
                              defaultValue={dataPhrase.comment_en}
                            />
                          )}
                          defaultValue={dataPhrase.comment_en}
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
                      <Controller
                        name="isMain"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            defaultChecked={dataPhrase.isMain}
                            onChange={field.onChange}
                          >
                            <p className="addText">{t("isMain")}</p>
                          </Checkbox>
                        )}
                      ></Controller>
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
                          fileList={fileListPhrase}
                          onChange={onChange}
                          onPreview={onPreview}
                          onRemove={() => {
                            setPhotoId("");
                          }}
                        >
                          {fileListPhrase.length < 1 && `+ ${t("Upload")}`}
                        </Upload>
                      </ImgCrop>

                      <p
                        style={{
                          color: fileListPhrase.length == 0 ? "red" : "green",
                        }}
                      >
                        {fileListPhrase.length == 0
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
                              onChange={field.onChange}
                              defaultValue={dataWord.description_uz}
                            />
                          )}
                          name={`description_uz`}
                          defaultValue={dataWord.description_uz}
                          control={control}
                          rules={{ required: true }}
                        />
                        {errors.description_uz && (
                          <p className="errorText">{t("Missing")}</p>
                        )}
                      </label>
                    </div>
                    <label>
                      <p className="addText"> {t("Description")} en</p>
                      <Controller
                        render={({ field }) => (
                          <RichTextEditor
                            {...field}
                            onChange={field.onChange}
                            defaultValue={dataWord.description_en}
                          />
                        )}
                        defaultValue={dataWord.description_en}
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
                            defaultValue={dataWord.comment_uz}
                          />
                        )}
                        defaultValue={dataWord.comment_uz}
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
                            defaultValue={dataWord.comment_en}
                          />
                        )}
                        defaultValue={dataWord.comment_en}
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
                          fileList={fileListWords}
                          onChange={onChange}
                          onPreview={onPreview}
                          onRemove={() => setPhotoId("")}
                        >
                          {fileListWords.length < 1 && `+ ${t("Upload")}`}
                        </Upload>
                      </ImgCrop>
                      {fileListWords.length == 0 && (
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
