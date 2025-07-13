import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Product from "../../ui/BoxProduct";
import ProductSkeleton from "../../ui/ProductSkeleton";
import { productsApi } from "../../../services/productsApi";
import empty from "../../../assets/images/empty.png";

export default function FilterProducts() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";
  const slugCategory = queryParams.get("slugcategory") || "";
  const priceFilter = queryParams.get("pricefilter") || "";
  const [filterLoading, setFilterLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  let priceRange = { min: null, max: null };
  if (priceFilter) {
    if (priceFilter === "<100000") {
      priceRange = { min: 0, max: 100000 };
    } else if (priceFilter === ">500000") {
      priceRange = { min: 500000, max: null };
    } else {
      const [min, max] = priceFilter.split("-").map(Number);
      priceRange = { min, max };
    }
  }

  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => productsApi.getAllProducts(),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setFilterLoading(true);
    setVisibleCount(10);
    const timer = setTimeout(() => {
      setFilterLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, slugCategory, priceFilter]);

  const filteredProducts = allProducts?.filter((product) => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (slugCategory && product.slugCategory !== slugCategory) {
      return false;
    }

    if (priceFilter) {
      const price = product.priceSale || product.priceOriginal;
      if (priceRange.min !== null && price < priceRange.min) return false;
      if (priceRange.max !== null && price > priceRange.max) return false;
    }

    return true;
  }) || [];

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="max-w-screen-xl mx-auto sm:mt-25 mt-40 sm:px-10 px-5 mb-10">
      <div className="flex justify-between">
        <span className="uppercase text-md font-bold text-gray-800">
          Tìm kiếm hiện tại:
        </span>
        <span className="text-md font-bold text-gray-800">
          {isLoading ? "Đang tải..." : `${filteredProducts.length} kết quả tìm được`}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
        {isLoading || filterLoading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </>
        ) : error ? (
          <div className="col-span-5 text-center text-red-500">
            Lỗi khi tải sản phẩm
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-5 flex flex-col items-center justify-center">
            <img src={empty} alt="Không tìm thấy sản phẩm nào!" className="w-33" />
            <p className="text-gray-500 mt-7 font-semibold text-md">Không tìm thấy sản phẩm nào!</p>
          </div>
        ) : (
          visibleProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              priceOriginal={product.priceOriginal}
              priceDiscounted={product.priceSale}
              name={product.name}
              imgSrc={product.image}
            />
          ))
        )}
      </div>

      {!isLoading && !filterLoading && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="border border-blue-500 text-blue-500 font-semibold px-6 py-1 pt-2 rounded-full transition cursor-pointer hover:bg-blue-100 duration-200"
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
}
