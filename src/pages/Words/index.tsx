import { useTranslation } from "react-i18next";
export default function Words() {
  let { t } = useTranslation();
  return (
    <div className="words-page">
      <h1>{t("Words")}</h1>
    </div>
  );
}
