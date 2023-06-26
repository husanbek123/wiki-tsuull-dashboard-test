/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Collapse, Empty, Modal } from "antd";
import { useGetData } from "../../../utils/hooks/useGet";
import parse from "html-react-parser";
import style from "./index.module.scss";
import { postUrl } from "../../../types/defaultType";
import { Link } from "react-router-dom";
import { api } from "../../../utils/axios";
import { useTranslation } from "react-i18next";
import ComponentLoader from "../../ComponentLoader";
export function Single(props: {
  url: postUrl;
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
}) {
  const { url, id, isModalOpen, setIsModalOpen } = props;
  const useGet = useGetData([`single-${url}`], url.toString());
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const data = useGet.data?.data.find(
    (item: { _id: string }) => item._id == id
  );
  const { t } = useTranslation();
  console.log(
    data?.frame
      ?.split(" ")
      ?.find((item: any) => item.includes("src"))
      ?.split("src=")[1]
      .slice(1, -1)
  );

  return (
    <Modal width={800} open={isModalOpen} footer={null} onCancel={handleOk}>
      {data ? (
        <>
          {!["/media", "/media-category"].includes(props.url) ? (
            <div className={style.wrapper}>
              <div className="addText">
                <div>
                  <b>{t("title_uz")} </b>: {data?.title_uz}
                </div>
                <div>
                  <b>{t("title_en")}</b> : {data?.title_en}
                </div>
              </div>
            </div>
          ) : (
            <div className="addText" style={{ padding: "10px 0" }}>
              <div style={{ fontSize: "1.1rem", padding: "10px 0" }}>
                {t("title_uz")} :<b> {data?.title_uz}</b>
              </div>
              <div style={{ fontSize: "1.1rem", padding: "10px 0" }}>
                {t("title_en")} :<b> {data?.title_en}</b>
              </div>
            </div>
          )}
          <div className={style.wrapper}>
            {url == "/media" && (
              <div>
                <div className="addText">
                  <div style={{ fontSize: "1.1rem", padding: "10px 0" }} >
                    <b>{t("Category")} uz</b> : {data.category[0]?.title_uz}
                  </div>
                  <div style={{ fontSize: "1.1rem" }}>
                    <b>{t("Category")} en</b> : {data.category[0].title_en}
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
                      ?.find((item: any) => item.includes("src"))
                      ?.split("src=")[1]
                      .slice(1, -1)}
                  >
                    {t("OpenVideo")}
                  </Button>
                </div>
              </div>
            )}
            {url == "/phrase" && data && (
              <>
                <Collapse
                  accordion
                  size="large"
                  items={[
                    {
                      key: "1",
                      label: `${t("Description")}`,
                      children: (
                        <div className="addText">
                          <div className={style.description}>
                            <b>UZ :</b>
                            {parse(data?.description_uz)}
                          </div>
                          <div>
                            <b>EN : </b>
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
                          <div className={style.comment}>
                            <b> UZ :</b>
                            {parse(data?.comment_uz)}
                          </div>
                          <div>
                            <b>EN: </b>
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
                              index: any
                            ) => {
                              return (
                                <>
                                  {
                                    // !data.writers === undefined ? <p >Malimot Push qilinmagan</p> : null

                                    console.log("item Item ", 12432353, item)
                                  }
                                  <Link
                                    target="_blank"
                                    key={index}
                                    className={style.writer}
                                    to={item.link}
                                  >
                                    {item.name.length > 50 ? (
                                      <Button>{item.name.slice(0, 50)}...</Button>
                                    ) : (
                                      <Button>{item.name}</Button>
                                    )}
                                  </Link>
                                </>
                              )
                            }
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
                                index: any
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
            {url == "/word" && data && (
              <div className={style.MainWordWrapper}>
                <div>
                  <div className="addText">
                    <div className={style.description}>
                      <b>Description uz :</b>
                      {parse(data?.description_uz)}
                    </div>
                    <div className={style.description}>
                      <b>Description en : </b>
                      {parse(data?.description_en)}
                    </div>
                  </div>

                  <div className="addText">
                    <div className={style.comment}>
                      <b>Comment uz :</b>
                      {parse(data?.comment_uz)}
                    </div>
                    <div className={style.comment}>
                      <b>Comment en : </b>
                      {parse(data?.comment_en)}
                    </div>
                  </div>
                </div>
                <div className={style.img}>
                  <img width={150} src={api + "/file/" + data.image.path} alt="" />
                </div>
              </div>
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
