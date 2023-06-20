import { Navigate } from "react-router-dom";
import { useToken } from "../zustand/useStore";
const Protected = ({ children }: any) => {
  const token = useToken((state) => state.token);
  if (token.trim() === "") {
    return <Navigate to="/login" />;
  }
  return children;
};
export default Protected;
