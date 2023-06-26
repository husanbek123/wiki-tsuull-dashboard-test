import { Button, Checkbox, Collapse, Modal } from "antd";
import { useGetData } from "../../../utils/hooks/useGet";
import parse from "html-react-parser";
import style from "./index.module.scss";
import { postUrl } from "../../../types/defaultType";
import { Link } from "react-router-dom";
import { api } from "../../../utils/axios";
import { useTranslation } from "react-i18next";
import ComponentLoader from "../../ComponentLoader";
export function Single(props: {
  postUrl: postUrl;
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
}) {
  const { id, isModalOpen, setIsModalOpen } = props;
  const { t } = useTranslation();
  const useGet = useGetData([`single-${props.postUrl}`], `${props.postUrl}`);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const data = useGet?.data?.data?.find(
    (item: { _id: string }) => item._id == id
  );
  console.log(data);

  return (
    <Modal width={800} open={isModalOpen} footer={null} onCancel={handleOk}>
      {data ? (
        <>
          {!["/media", "/media-category"].includes(props.postUrl) ? (
            <div
              className={style.wrapper}
              style={{
                margin: "40px 40px",
              }}
            >
              <Collapse
                activeKey={"123456789".split("")}
                expandIcon={() => ""}
                items={[
                  {
                    key: "1",
                    label: `${t("title")}`,
                    children: (
                      <div className="addText">
                        <div>
                          <b>{t("title_uz")}</b> : {data?.title_uz}
                        </div>
                        <div>
                          <b>{t("title_en")}</b> : {data?.title_en}
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          ) : (
            <div className="addText">
              <div>
                {t("title_uz")} :<b> {data?.title_uz}</b>
              </div>
              <div>
                {t("title_en")} :<b> {data?.title_en}</b>
              </div>
            </div>
          )}
          <div className={style.wrapper}>
            {props.postUrl == "/media" && (
              <div>
                <div className="addText">
                  <div>
                    <b>{t("Category")} uz</b> : {data.category[0]?.title_uz}
                  </div>
                  <div>
                    <b>{t("Category")} en</b> : {data.category[0]?.title_en}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                  className="addText"
                >
                  <Button
                    href={data?.frame
                      ?.split(" ")
                      ?.find((item: string[]) => item.includes("src"))
                      ?.split("src=")[1]
                      .slice(1, -1)}
                    target="_blank"
                  >
                    {t("OpenVideo")}
                  </Button>
                </div>
              </div>
            )}
            {props.postUrl == "/phrase" && (
              <>
                <Collapse
                  activeKey={"123456789".split("")}
                  expandIcon={() => ""}
                  items={[
                    {
                      key: "1",
                      label: `${t("Description")}`,
                      children: (
                        <div className="addText">
                          <div
                            style={{
                              margin: "30px 0",
                            }}
                          >
                            <b>{t("Description")} uz : </b>
                            {parse(data?.description_uz)}
                          </div>
                          <div
                            style={{
                              margin: "30px 0",
                            }}
                          >
                            <b>{t("Description")} en :</b>
                            {parse(data?.description_en)}
                          </div>
                        </div>
                      ),
                    },
                    {
                      key: "2",
                      label: `${t("Comment")}`,
                      children: (
                        <div className="addText">
                          <div
                            style={{
                              margin: "30px 0",
                            }}
                          >
                            <b> {t("Comment")} uz : </b>
                            {parse(data?.comment_uz)}
                          </div>
                          <div
                            style={{
                              margin: "30px 0",
                            }}
                          >
                            <b> {t("Comment")} en :</b>
                            {parse(data?.comment_en)}
                          </div>
                        </div>
                      ),
                    },
                    {
                      key: "3",
                      label: `${t("writers")}`,
                      children: (
                        <div className={[style.writers, "addText"].join(" ")}>
                          {data.writers.map(
                            (
                              item: { name: string; link: string },
                              index: number
                            ) => (
                              <Link
                                key={index}
                                className={style.writer}
                                to={item.link}
                                target="_blank"
                              >
                                {item.name.length > 50 ? (
                                  <Button>{item.name.slice(0, 50)}...</Button>
                                ) : (
                                  <Button>{item.name}</Button>
                                )}
                              </Link>
                            )
                          )}
                        </div>
                      ),
                    },
                    {
                      key: "4",
                      label: `${t("informations")}`,
                      children: (
                        <div className={[style.writers, "addText"].join(" ")}>
                          <div className={style.informations}>
                            {data.informations.map(
                              (
                                item: {
                                  name_uz: string;
                                  name_en: string;
                                  info_uz: string;
                                  info_en: string;
                                },
                                index: number
                              ) => (
                                <div key={index} className={style.information}>
                                  <p>
                                    <b>{t("name")} uz : </b> {item.name_uz}
                                  </p>
                                  <p>
                                    <b>{t("name")} en : </b> {item.name_en}
                                  </p>
                                  <p>
                                    <b>{t("info")} uz : </b>
                                    {item.name_uz}
                                  </p>
                                  <p>
                                    <b>{t("info")} en : </b>
                                    {item.name_en}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ),
                    },
                    {
                      key: "5",
                      label: `${t("isMain")}`,
                      children: <Checkbox checked={data.isMain}></Checkbox>,
                    },
                  ]}
                />

                <div className={style.img}>
                  <img src={api + "/file/" + data.image.path} alt="" />
                </div>
              </>
            )}
            {props.postUrl == "/word" && (
              <>
                <Collapse
                  activeKey={"123456789".split("")}
                  expandIcon={() => ""}
                  items={[
                    {
                      key: "1",
                      label: t("Description"),
                      children: (
                        <div className="addText">
                          <div className={style.description}>
                            <b>{t("Description")} uz :</b>
                            {parse(data?.description_uz)}
                          </div>
                          <div className={style.description}>
                            <b>{t("Description")} en : </b>
                            {parse(data?.description_en)}
                          </div>
                        </div>
                      ),
                    },
                    {
                      key: "2",
                      label: t("Comment"),
                      children: (
                        <div className="addText">
                          <div className={style.comment}>
                            <b>{t("Comment")} uz :</b>
                            {parse(data?.comment_uz)}
                          </div>
                          <div className={style.comment}>
                            <b>{t("Comment")} en : </b>
                            {parse(data?.comment_en)}
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />

                <div className={style.img}>
                  <img src={api + "/file/" + data.image.path} alt="" />
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            minHeight: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ComponentLoader></ComponentLoader>
        </div>
      )}
    </Modal>
  );
}
