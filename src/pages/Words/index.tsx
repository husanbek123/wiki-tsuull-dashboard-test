import { useTranslation } from "react-i18next";
import WordTable from "../../components/WordComponent/Table/WordTable";
import WordModal from "../../components/WordComponent/Modal/WordModal";
export default function Words() {
  let { t } = useTranslation();
  return (
    <div className="words-page">
      <h1>{t("Words")}</h1>
      <div className="word-modal">
        <WordModal />
      </div>
      <div className="word-table">
        <WordTable />
      </div>
    </div>
  );
}
