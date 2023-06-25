import { Breadcrumb } from "antd";
export const ComponenBreadCrumb = (props: { url: string }) => {
  return (
    <div className="bredcrumb">
      <Breadcrumb
        items={[
          {
            title: (
              <b
                style={{
                  fontSize: "22px",
                  padding: "2px 20px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {props.url}
              </b>
            ),
          },
        ]}
      />
    </div>
  );
};
