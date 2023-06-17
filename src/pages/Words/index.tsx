import WordTable from "../../components/WordComponent/Table/WordTable";
import WordModal from "../../components/WordComponent/Modal/WordModal";
export default function Words() {
  return (
    <div className="words-page">
      <div className="word-modal">
        <WordModal />
      </div>
      <div className="word-table">
        <WordTable />
      </div>
    </div>
  );
}
