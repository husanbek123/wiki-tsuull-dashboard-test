import { Breadcrumb } from "antd";
export const ComponenBreadCrumb = (props: { url: string }) => {
  return (
    <Breadcrumb
      items={[
        {
          title: <a>{props.url}</a>,
        },
      ]}
    />
  );
};
