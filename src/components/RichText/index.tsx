import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function RichText(props: {
  value: string;
  setValue: (str: string) => void;
}) {
  const { value, setValue } = props;

  function handleChange(newValue:string) {
    setValue(newValue);
  }

  return <ReactQuill value={value} onChange={handleChange} />;
}
