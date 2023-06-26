import { useTheme } from "../../utils/zustand/useTheme";
export const ComponentBreadCrumb = (props: { url: string }) => {
  const theme = useTheme(state => state.theme);
  return (
<<<<<<< HEAD
    <>
      <h1 style={{
        color: theme === "light" ? "black" : "white",
        display: "block",
        margin: "20px auto",
        padding: "2px 20px"
      }}>{props.url}</h1>
    </>
  )
=======
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
>>>>>>> c373c7a4588ea36ab26d5f88e246a8db66791ca2
};
