import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import bg_category from "../../../assets/images/banner_category.jpg";

export default function FilterHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search") || "";
  const initialCategory = queryParams.get("slugcategory") || "";
  const initialPrice = queryParams.get("pricefilter") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPrice, setSelectedPrice] = useState(initialPrice);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (debouncedSearchQuery) {
      queryParams.set("search", debouncedSearchQuery);
    } else {
      queryParams.delete("search");
    }

    if (selectedCategory) {
      queryParams.set("slugcategory", selectedCategory);
    } else {
      queryParams.delete("slugcategory");
    }

    if (selectedPrice) {
      queryParams.set("pricefilter", selectedPrice);
    } else {
      queryParams.delete("pricefilter");
    }

    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  }, [selectedCategory, selectedPrice, navigate, location.pathname, location.search, debouncedSearchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  return (
    <div className="relative">
      <img
        src={bg_category}
        className="absolute inset-0 block h-full w-full object-cover"
      ></img>
      <div className="absolute inset-0 bg-black opacity-30 -z-0"></div>
      <div className="max-w-screen-xl mx-auto min-h-60 flex flex-col items-center pt-17 z-10 text-center">
        <h1 className="sm:text-4xl text-xl uppercase font-extrabold text-white z-10">
          Tìm sách Tiếng Anh của bạn
        </h1>
        <p className="text-white sm:text-lg text-sm mt-1 z-10">
          Tìm sách Tiếng Anh của bạn theo danh mục hoặc từ khóa.
        </p>
      </div>
      <div className="absolute w-[90%] md:w-auto z-10 md:-bottom-1/4 -bottom-1/2 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-sm flex md:flex-row flex-col gap-2 lg:p-10 lg:px-15 p-5">
        <input
          type="text"
          placeholder="Bạn muốn tìm sách gì?"
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-white px-4 py-2 sm:min-w-75 w-full text-base border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <select 
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-3 py-2 text-base bg-white border border-gray-300 text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="">Lọc theo danh mục</option>
          <option value="ngu-phap">Sách Ngữ Pháp</option>
          <option value="tieng-anh-thieu-nhi">Sách Tiếng Anh Thiếu Nhi</option>
          <option value="luyen-thi-ielts">Sách Luyện Thi IELTS</option>
          <option value="luyen-thi-toeic">Sách Luyện Thi TOEIC</option>
          <option value="tu-vung">Sách Từ Vựng</option>
          <option value="luyen-thi-toefl">Sách Luyện Thi TOEFL</option>
        </select>
        <select 
          value={selectedPrice}
          onChange={handlePriceChange}
          className="px-3 py-2 text-base bg-white border border-gray-300 text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="">Lọc theo giá</option>
          <option value="<100000">Dưới 100.000đ</option>
          <option value="100000-200000">100.000đ - 200.000đ</option>
          <option value="200000-300000">200.000đ - 300.000đ</option>
          <option value="300000-500000">300.000đ - 500.000đ</option>
          <option value=">500000">Trên 500.000đ</option>
        </select>
      </div>
    </div>
  );
}
