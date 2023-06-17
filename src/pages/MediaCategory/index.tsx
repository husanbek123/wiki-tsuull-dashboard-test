import { useTranslation } from "react-i18next";
import MediaModalCaterory from "../../components/MediaCategoryComponent/Modal/MediaModalCaterory";
import MediaCategoryTable from "../../components/MediaCategoryComponent/Table/MediaCategoryTable";
export default function MediaCategory() {
  let { t } = useTranslation();
  return (
    <div>
      <h1>{t("MediaCategory")}</h1>
      <div className="media-category-modal">
        <MediaModalCaterory />
      </div>
      <div className="media-table">
        <MediaCategoryTable />
      </div>
    </div>
  );
}
