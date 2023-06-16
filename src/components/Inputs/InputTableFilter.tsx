import { Input } from "antd";

export function InputTableFilter(props: {
  value: string;
  setValue: (value: any) => void;
  setDataSource: any;
  zaprosData: any;
}) {
  const { value, zaprosData, setValue, setDataSource } = props;
  return (
    <Input
      placeholder="Search"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value.toLowerCase();
        setValue(currValue);
        const filteredData = zaprosData.filter((entry: any) =>
          entry.title_uz.toLowerCase().includes(currValue)
        );

        setDataSource(filteredData);
      }}
    />
  );
}
