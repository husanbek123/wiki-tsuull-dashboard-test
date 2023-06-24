/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "code"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code",
];

export function RichText(props: { value: any; setValue: (str: any) => void }) {
  const { value, setValue } = props;

  function handleChange(newValue: string) {
    setValue(newValue);
  }

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
}
