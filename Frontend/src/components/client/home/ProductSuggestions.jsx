import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Product from "../../ui/BoxProduct";
import ProductSkeleton from "../../ui/ProductSkeleton";
import { productsApi } from "../../../services/productsApi";
import { useSelector } from "react-redux";

export default function ProductSuggestions() {
  const user = useSelector((state) => state.auth.user);
  const behavior = user?.behavior || [];
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productsBehavior", ...behavior],
    queryFn: async () => {
      const allProducts = await productsApi.getAllProducts();
      return allProducts.filter((product) =>
        behavior.includes(product.slugCategory)
      );
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div
      className="bg-[linear-gradient(180deg,_rgb(255_255_255_/_12%),_rgb(108_576_246_/_10%))]"
      id="product-suggestions"
    >
      <div className="max-w-screen-xl mx-auto sm:px-10 px-5 sm:pt-12 pt-7 sm:pb-9 pb-6">
        <div className="flex items-center justify-center py-3 mb-4 pt-4 border-b-4 border-green-700 pb-3 bg-green-200">
          <h2 className="sm:text-3xl text-2xl font-bold uppercase">
            Gợi ý sản phẩm
          </h2>
        </div>
        {isLoading ? (
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
        ) : products.length === 0 ? (
          <div className="text-center text-gray-700 text-lg mt-10 font-semibold">
            Không có sản phẩm nào gợi ý.
          </div>
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
            loop={products.length >= 2}
          >
            {products.map((product) => (
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
}
