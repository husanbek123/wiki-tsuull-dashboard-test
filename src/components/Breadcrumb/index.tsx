import { Breadcrumb } from "antd";
export const ComponenBreadCrumb = (props: { url: string }) => {
  return (
    <Breadcrumb
      items={[
        {
          title: <b style={{
            fontSize: "17px",
            backgroundColor : "lightgray",
            // paddingBottom: "5px",
            padding: "2px 20px"
          }}>{props.url}</b>,
        },
      ]}
    />
  );
};
