import { useTranslation } from "react-i18next";
export default function Pharse() {
  let { t } = useTranslation();
  return (
    <div className="pharse-page">
      <h1>{t("Pharse")}</h1>
    </div>
  );
}
