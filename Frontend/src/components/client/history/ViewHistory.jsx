import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";
import { FaHistory } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import empty from "../../../assets/images/empty.png";
import { useMutation } from "@tanstack/react-query";
import { usersApi } from "../../../services/usersApi";
import { setUser } from "../../../redux/authSlice";
import toast from "react-hot-toast";

export default function ViewHistory() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const history = user?.history || [];
  const [visibleCount, setVisibleCount] = useState(5);
  const [indexRemove, setIndexRemove] = useState(null);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleDeleteHistory = (index) => {
    setIndexRemove(index);
    const updatedHistory = history.filter((_, i) => i !== index);
    dispatch(setUser({ ...user, history: updatedHistory }));

    updateUserMutation.mutate({
      ...user,
      history: updatedHistory,
    });
  };
  const updateUserMutation = useMutation({
    mutationFn: usersApi.updateUser,
    onSuccess: () => {
      toast.success("Xóa lịch sử thành công");
      setIndexRemove(null);
    },
    onError: () => {
      toast.error("Cập nhật lịch sử thất bại. Vui lòng thử lại.");
    },
  });

  return (
    <div className="max-w-screen-xl mx-auto my-10 px-5 sm:px-10">
      {history && history.length > 0 && (
        <h2 className="text-xl sm:text-3xl font-bold flex items-center justify-center text-white mb-10 text-center border-b-4 border-blue-800 bg-blue-400 mx-auto w-full p-2 px-5 pt-3">
          <FaHistory className="inline-block mr-2 mb-1" /> Lịch sử xem sản phẩm
        </h2>
      )}
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 h-full">
          <img
            src={empty}
            alt="Không có sản phẩm yêu thích nào!"
            className="w-45 object-contain"
          />
          <p className="text-gray-500 mt-7 text-lg font-medium">
            Lich sử xem sản phẩm của bạn hiện tại trống.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center overflow-x-auto pb-10 gap-y-7">
            {history.slice(0, visibleCount).map((product, index) => (
              <div
                className={`flex items-center gap-3 w-full p-2 ${
                  index % 2 == 0 && ""
                }`}
                key={index}
              >
                <div className="font-semibold mr-5 text-nowrap">
                  {product.dateView}
                </div>
                <img src={product.image} alt={product.name} className="w-10" />
                <Link to={`/category?search=${product.name}`} className="font-semibold line-clamp-1 min-w-[300px] cursor-pointer">
                  {product.name}
                </Link>
                <div className="items-center gap-3 flex mx-5">
                  <span className="text-lg text-red-600 font-semibold text-nowrap">
                    {formatPrice(product.priceSale)}
                  </span>
                  <span className="line-through text-sm text-gray-400 mb-1 text-nowrap">
                    {formatPrice(product.priceOriginal)}
                  </span>
                  <span className="bg-red-500 mb-2 text-white text-xs px-2 py-0.5 rounded font-bold transform transition-transform duration-300">
                    -
                    {Math.round(
                      ((product.priceOriginal - product.priceSale) /
                        product.priceOriginal) *
                        100
                    )}
                    %
                  </span>
                </div>
                <button
                  disabled={updateUserMutation.isPending && indexRemove === index}
                  onClick={() => handleDeleteHistory(index)}
                  className="font-bold border border-red-500 text-nowrap justify-self-start ml-auto text-red-500 px-3 py-1 text-sm rounded  cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300"
                >
                    {updateUserMutation.isPending && indexRemove === index
                     ? (
                      "Đang xóa..."
                    ) : (
                      "Xóa"
                    )}
                </button>
              </div>
            ))}
          </div>
          {visibleCount < history.length && (
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
