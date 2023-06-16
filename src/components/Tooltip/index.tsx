import { Tooltip } from "antd";

export default function TOOLTIP(props: {
  title: any;
  color: string;
  key: any;
  children: React.ReactNode;
}) {
  const { title, color, key, children } = props;
  return (
    <Tooltip title={title} color={color} key={key}>
      {children}
    </Tooltip>
  );
}
