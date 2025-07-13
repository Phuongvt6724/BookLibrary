import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";
import Product from "../../ui/BoxProduct";
import ProductSkeleton from "../../ui/ProductSkeleton";
import { useSelector } from "react-redux";
import { productsApi } from "../../../services/productsApi";

export default function SectionProduct() {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const sectionCategory = [
    {
      id: 1,
      slug: "ngu-phap",
      name: "Ngữ Pháp",
    },
    {
      id: 2,
      slug: "tieng-anh-thieu-nhi",
      name: "Tiếng Anh Thiếu Nhi",
    },
    {
      id: 3,
      slug: "luyen-thi-ielts",
      name: "Luyện Thi IELTS",
    },
    {
      id: 4,
      slug: "luyen-thi-toeic",
      name: "Luyện Thi TOEIC",
    },
    {
      id: 5,
      slug: "tu-vung",
      name: "Từ Vựng",
    },
    {
      id: 6,
      slug: "luyen-thi-toefl",
      name: "Luyện Thi TOEFL",
    },
  ].filter(
    (category) => selectedCategory === "all" || category.slug === selectedCategory
  );
  const bgColor = [
    "bg-[linear-gradient(180deg,_rgb(255_255_255_/_12%),_rgb(28_176_246_/_10%))]",
    "bg-[linear-gradient(180deg,_rgb(255_255_255_/_12%),_rgb(655_50_0_/_10%))]",
    "bg-[linear-gradient(180deg,_rgb(255_255_255_/_12%),_rgb(88_204_2_/_10%))]",
    "bg-[linear-gradient(180deg,_rgb(255_255_255_/_12%),_rgb(255_150_0_/_10%))]",
    "bg-[linear-gradient(180deg,_rgb(255_255_255_/_12%),_rgb(255_170_222_/_10%))]",
    "bg-[linear-gradient(180deg,_rgb(255_255_255_/_12%),_rgb(249_255_18_/_10%))]",
  ];

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => productsApi.getAllProducts(),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setShowSkeleton(true);
    const timer = setTimeout(() => setShowSkeleton(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  return (
    <>
      {sectionCategory.map((category, index) => {
        const filteredProducts = products?.filter(
          (product) => product.slugCategory === category.slug
        ) || [];

        return (
          <div key={category.id} className={`${bgColor[index]}`}>
            <div className="max-w-screen-xl mx-auto sm:px-10 px-5 sm:pt-12 pt-7 sm:pb-9 pb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="sm:text-3xl text-lg font-bold">
                  Sách {category.name}
                </h2>
                <Link
                  className="text-primary-700 font-semibold text-md hover:text-green-700"
                  to={`/category?slugcategory=${category.slug}`}
                >
                  Xem tất cả{" "}
                  <GrFormNextLink className="inline-block text-xl mb-0.5" />
                </Link>
              </div>
              {isLoading || showSkeleton ? (
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={10}
                  slidesPerView={2}
                  breakpoints={{
                    300: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  speed={3000}
                  loop={false} 
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SwiperSlide key={index}>
                      <ProductSkeleton />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : error ? (
                <div>Error: {error.message}</div>
              ) : filteredProducts.length === 0 ? (
                <div>Không có sản phẩm nào trong danh mục {category.name}</div>
              ) : (
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={10}
                  slidesPerView={2}
                  breakpoints={{
                    300: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  speed={3000}
                  loop={filteredProducts.length >= 2}
                >
                  {filteredProducts.map((product) => (
                    <SwiperSlide key={product.name}>
                      <Product
                        id={product.id}
                        priceOriginal={product.priceOriginal}
                        priceDiscounted={product.priceSale}
                        name={product.name}
                        imgSrc={product.image}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}