import { useState } from "react";
import { useSelector } from "react-redux";
import BoxProduct from "../../ui/BoxProduct";
import empty from "../../../assets/images/empty.png";
import { IoHeartCircleSharp } from "react-icons/io5";

export default function Favorites() {
  const user = useSelector((state) => state.auth.user);
  const favorites = user?.productsFavorite || [];
  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="max-w-screen-xl mx-auto my-10 px-5 sm:px-10">
      {favorites.length > 0 && (
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center text-white mb-10 text-center border-b-4 border-pink-800 bg-pink-400 mx-auto w-full p-2 px-5 pt-3">
          <IoHeartCircleSharp className="inline-block mr-2 mb-1" /> Sản phẩm yêu
          thích của bạn
        </h2>
      )}

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <img
            src={empty}
            alt="Không có sản phẩm yêu thích nào!"
            className="w-45 object-contain"
          />
          <p className="text-gray-500 mt-7 text-lg font-medium">
            Bạn chưa thêm sản phẩm nào vào mục yêu thích.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 mt-6">
            {favorites.slice(0, visibleCount).map((product) => (
              <BoxProduct
                key={product.id}
                id={product.id}
                priceOriginal={product.priceOriginal}
                priceDiscounted={product.priceSale}
                name={product.name}
                imgSrc={product.image}
              />
            ))}
          </div>
          {visibleCount < favorites.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="border border-blue-500 text-blue-500 font-semibold px-6 py-1 pt-2 rounded-full transition cursor-pointer hover:bg-blue-100 duration-200"
              >
                Xem thêm
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
