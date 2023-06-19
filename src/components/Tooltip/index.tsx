import { Tooltip } from "antd";

export default function TOOLTIP(props: {
  title: any;
  color: string;
  key: string;
  children: React.ReactNode;
}) {
  const {  color, key, children } = props;
 
  return (
    <Tooltip  color={color} key={key}>
      {children}
    </Tooltip>
  );
}
