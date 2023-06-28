/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateTable from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function SELECT(props: {
  data: any;
  defaultValue?: any;
  setData: any;
}) {
  return (
    <CreateTable
      isClearable
      components={animatedComponents}
      options={props.data}
      defaultValue={props.defaultValue || []}
      onChange={(e) => props.setData(e)}
      className="select"
    />
  );
}
