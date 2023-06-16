import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import { useState } from "react";
export default function Media() {
  let { t } = useTranslation();

  return (
    <div className="media-page">
        <h1>
          {t("Media")}
        </h1>
    </div>
  );
}
