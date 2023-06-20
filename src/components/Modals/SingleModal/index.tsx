/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Collapse, Modal } from "antd";
import { useGetData } from "../../../utils/hooks/useGet";
import parse from "html-react-parser";
import style from "./index.module.scss";
import { postUrl } from "../../../types/defaultType";
import { Link } from "react-router-dom";
import { api } from "../../../utils/axios";
import { useTranslation } from "react-i18next";
export function Single(props: {
  url: postUrl;
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
}) {
  const { url, id, isModalOpen, setIsModalOpen } = props;
  const useGet = useGetData([`single-${url}`], `${url}`);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const data = useGet.data?.data.find(
    (item: { _id: string }) => item._id == id
  );

  const { t } = useTranslation();

  return (
    data && (
      <Modal
        width={800}
        open={isModalOpen}
        cancelButtonProps={{ style: { display: "none" } }}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <div className={style.wrapper}>
          <Collapse
            items={[
              {
                key: "1",
                label: "Titles",
                children: (
                  <>
                    <div>
                      Title uz :<b> {data?.title_uz}</b>
                    </div>
                    <div>
                      Title en :<b> {data?.title_en}</b>
                    </div>
                  </>
                ),
              },
            ]}
          />
          {url == "/media" && (
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Frame",
                  children: (
                    <div
                      style={{
                        width: "100%",
                        height: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      {parse(data?.frame)}
                    </div>
                  ),
                },
              ]}
            />
          )}
          {url == "/phrase" && data && (
            <>
              <Collapse
                items={[
                  {
                    key: "1",
                    label: "Descriptions",
                    children: (
                      <>
                        <div className={style.description}>
                          <b>Description uz :</b>
                          {parse(data?.description_uz)}
                        </div>
                        <div>
                          <b>Description en : </b>
                          {parse(data?.description_en)}
                        </div>
                      </>
                    ),
                  },
                  {
                    key: "2",
                    label: "Comments",
                    children: (
                      <>
                        <div className={style.comment}>
                          <b>Comment uz :</b>
                          {parse(data?.comment_uz)}
                        </div>
                        <div>
                          <b>Comment en : </b>
                          {parse(data?.comment_en)}
                        </div>
                      </>
                    ),
                  },
                  {
                    key: "3",
                    label: "Writers",
                    children: (
                      <div className={style.writers}>
                        <b>Writers:</b>
                        {data.writers.map(
                          (
                            item: { name: string; link: string },
                            index: any
                          ) => (
                            <Link
                              key={index}
                              className={style.writer}
                              to={item.link}
                            >
                              <Button>{item.name}</Button>
                            </Link>
                          )
                        )}
                      </div>
                    ),
                  },
                  {
                    key: "4",
                    label: "Informations",
                    children: (
                      <div className={style.writers}>
                        <b>Informations:</b>
                        <div className={style.informations}>
                          <b>informations:</b>
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
                                  <b>name uz </b> : {item.name_uz}
                                </p>
                                <p>
                                  <b>name en </b> : {item.name_en}
                                </p>
                                <p>
                                  <b>info uz </b> : {item.name_uz}
                                </p>
                                <p>
                                  <b>info en </b> : {item.name_en}
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
                    label: "checkbox",
                  },
                ]}
              />

              <div className={style.img}>
                <img src={api + "/file/" + data.image.path} alt="" />
              </div>
            </>
          ) }
          {url == "/word" && data &&(
            <>
              <Collapse
                items={[
                  {
                    key: "1",
                    label: "Descriptions",
                    children: (
                      <>
                        <div className={style.description}>
                          <b>Description uz :</b>
                          {parse(data?.description_uz)}
                        </div>
                        <div className={style.description}>
                          <b>Description en : </b>
                          {parse(data?.description_en)}
                        </div>
                      </>
                    ),
                  },
                  {
                    key: "2",
                    label: "Comments",
                    children: (
                      <>
                        <div className={style.comment}>
                          <b>Comment uz :</b>
                          {parse(data?.comment_uz)}
                        </div>
                        <div className={style.comment}>
                          <b>Comment en : </b>
                          {parse(data?.comment_en)}
                        </div>
                      </>
                    ),
                  },
                ]}
              />

              <div className={style.img}>
                <img src={api + "/file/" + data.image.path} alt="" />
              </div>
            </>
          ) }
        </div>
      </Modal>
    )
  );
}
