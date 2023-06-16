import { toast } from "react-toastify";

export default function ErrorToastify(msg?: string) {
  return toast.error(`${msg || "Error"}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
