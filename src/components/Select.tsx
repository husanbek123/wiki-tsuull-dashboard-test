import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function SELECT(props: {
  data: any;
  defaultValue?: { value: string; label: string }[];
  setCategoryData: (value: any) => void;
}) {
  return (
    <Select
      //   closeMenuOnSelect={false}
      options={props.data}
      components={animatedComponents}
      defaultValue={props.defaultValue || []}
      isMulti
      onChange={(e) => props.setCategoryData(e)}
    />
  );
}
