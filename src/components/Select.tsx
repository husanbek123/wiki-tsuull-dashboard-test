/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function SELECT(props: {
  data: any;
  defaultValue?: { value: string; label: string }[];
  setData: any;
}) {
  return (
    <Select
      options={props.data}
      components={animatedComponents}
      defaultValue={props.defaultValue || []}
      onChange={(e) => props.setData(e)}
    />
  );
}
