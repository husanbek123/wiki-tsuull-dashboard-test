import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function RichText(
  props: { value: any; setValue: (str: any) => void },
  // info?: boolean,
  // name?: string
) {
  const { value, setValue } = props;

  function handleChange(newValue: string) {
    // console.log(newValue);
    setValue(newValue)
    // if (info) {
      // setValue((prev: any) => [...prev, {
    //     [name] : 'sd'
    //   }]);
    // }
  }

  return <ReactQuill value={value} onChange={handleChange} />;
}
