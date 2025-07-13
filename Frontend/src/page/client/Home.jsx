import LibraryHeader from "../../components/client/home/LibraryHeader";
import SectionProduct from "../../components/client/home/SectionProduct";
import useScrollToTop from "../../hooks/useScrollToTop";
import ProductSuggestions from "../../components/client/home/ProductSuggestions";
import { useSelector } from "react-redux";

export default function Home() {
  const selectedSuggest = useSelector((state) => state.suggest.selectedSuggest);
  useScrollToTop();
  return (
    <>
      <LibraryHeader />
      {selectedSuggest && <ProductSuggestions />}
      <SectionProduct />
    </>
  );
}
