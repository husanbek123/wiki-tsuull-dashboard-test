import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function SuccessToastify(msg?: string) {
  const {t}  = useTranslation();
  return toast.success(`${msg || t("")}`, {
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
