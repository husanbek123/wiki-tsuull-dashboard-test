import { useGetData } from "../../../utils/hooks/useGet";

interface MediaCategoryProps {
  title_en: string;
  title_uz: string;
  _id: string;
}

export default function MediaCategoryTable() {
  const { data } = useGetData(["media-category"], "/media-category", {});
  let MediaCategoryResult: MediaCategoryProps[] = data?.data;
  return <div className="category-table"></div>;
}
