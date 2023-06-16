import style from "./loading.module.scss"
export default function Loading(){
  return (
    <main className={style.loaderWrapper}> 
        <span className={style.loader}></span>
        <h4 className={style.loadingTitle}>Loading...</h4>
    </main>
  )
}
