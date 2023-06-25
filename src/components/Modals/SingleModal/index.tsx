/* eslint-disable @typescript-eslint/no-explicit-any */
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
  url: postUrl;
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
}) {
  const { url, id, isModalOpen, setIsModalOpen } = props;
   const { t } = useTranslation();
  const useGet = useGetData([`single-${url}`], url.toString());
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const data = useGet?.data?.data?.find(
    (item: { _id: string }) => item._id == id
  );
 
  return (
   <h1>Single</h1>
  );
}

