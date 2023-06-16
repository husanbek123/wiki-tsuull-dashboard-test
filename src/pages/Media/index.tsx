import { useGetData } from "../../utils/hooks/useGet";
import styles from "./index.module.scss";
const dataCRUDname = "media";
export default function Media() {
  const useGet = useGetData([dataCRUDname], `/${dataCRUDname}`, {});
  if (useGet.isSuccess) {
    console.log(useGet.data.data);
  }
  return (
    <div className={styles.Main}>
      <div className={styles.container}>
        <div className={styles.table}></div>
      </div>
    </div>
  );
}
