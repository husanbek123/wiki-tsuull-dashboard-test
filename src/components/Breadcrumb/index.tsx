import { useTheme } from "../../utils/zustand/useTheme";
export const ComponentBreadCrumb = (props: { url: string }) => {
  const theme = useTheme(state => state.theme);
  return (
    <>
      <h1 style={{
        color: theme === "light" ? "black" : "white",
        display: "block",
        margin: "20px auto",
        padding: "2px 20px"
      }}>{props.url}</h1>
    </>
  )
};
