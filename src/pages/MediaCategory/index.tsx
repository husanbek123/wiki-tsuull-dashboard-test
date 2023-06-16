import { useTranslation } from "react-i18next";
export default function MediaCategory() {
  let { t } = useTranslation();
  return (
    <div>
      <h1>{t("MediaCategory")}</h1>
    </div>
  );
}
