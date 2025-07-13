import useScrollToTop from "../../hooks/useScrollToTop";
import FilterHeader from "../../components/client/category/FilterHeader";
import FilterProducts from "../../components/client/category/FilterProduct";

export default function Category() {
  useScrollToTop();
  return (
    <>
        <FilterHeader />
        <FilterProducts />
    </>
  );
}
