import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { TbHandClick } from "react-icons/tb";
import { IoMdHeart } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { usersApi } from "../../services/usersApi";

export default function Product({
  id,
  priceOriginal,
  priceDiscounted,
  name,
  imgSrc,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isFavorite = user?.productsFavorite?.some(
    (item) => String(item.id) === String(id)
  );
  const discount = Math.round(
    ((priceOriginal - priceDiscounted) / priceOriginal) * 100
  );

  const updateUserMutation = useMutation({
    mutationFn: usersApi.updateUser,
    onError: () => {
      toast.error("Thao tác thất bại. Vui lòng thử lại.");
    },
  });

  const handleFavoriteToggle = (productID) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isFavorite) {
      const updatedFavorites = user.productsFavorite.filter(
        (item) => String(item.id) !== String(productID)
      );
      dispatch(setUser({ ...user, productsFavorite: updatedFavorites }));
      updateUserMutation.mutate({
        ...user,
        productsFavorite: updatedFavorites,
      });
      toast.success("Đã xóa sản phẩm khỏi yêu thích");
    } else {
      const newFavorite = {
        id: productID,
        name,
        image: imgSrc,
        priceOriginal,
        priceSale: priceDiscounted,
      };
      dispatch(
        setUser({
          ...user,
          productsFavorite: [...user.productsFavorite, newFavorite],
        })
      );
      updateUserMutation.mutate({
        ...user,
        productsFavorite: [...user.productsFavorite, newFavorite],
      });
      toast.success("Đã thêm sản phẩm vào yêu thích");
    }
  };

  const handleAddHistory = () => {
    if (!user) {
      return;
    }
    const now = new Date();
    const newHistory = {
      id,
      name,
      image: imgSrc,
      priceOriginal,
      priceSale: priceDiscounted,
      dateView: `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${now.getDate().toString().padStart(2, "0")}/${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${now.getFullYear()}`,
    };
    const updatedHistory = [newHistory, ...(user.history || [])];
    dispatch(setUser({ ...user, history: updatedHistory }));
    updateUserMutation.mutate({
      ...user,
      history: updatedHistory,
    });
  };

  return (
    <Popup
      trigger={
        <div className="bg-white shadow rounded-lg text-center relative group cursor-pointer overflow-hidden transition-all duration-300">
          <span className="absolute top-2 right-2 bg-red-600 text-white text-sm px-3 pt-1 rounded text-[13px] font-bold">
            -{discount}%
          </span>
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-auto mb-2 rounded transform transition-transform duration-500 group-hover:scale-105 aspect-[3/4] object-cover group-hover:object-contain"
          />
          <div className="px-3 py-1">
            <p className="font-medium text-gray-800 text-left transition-colors duration-300 group-hover:text-gray-900 line-clamp-2">
              {name}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="sm:text-[15px] text-[14px] font-semibold text-red-600">
                {formatPrice(priceDiscounted)}
              </span>
              <span className="sm:text-sm text-[13px] text-gray-400 line-through">
                {formatPrice(priceOriginal)}
              </span>
            </div>
          </div>
          <div
            onClick={handleAddHistory}
            className="absolute cursor-pointer inset-0 bg-black/75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
          >
            <button className="font-semibold flex items-center justify-center hover:text-green-200 cursor-pointer text-md px-3 py-[6px] shadow text-white transition-all duration-500 transform group-hover:scale-105">
              Xem chi tiết <TbHandClick className="inline-block ml-1 mb-1" />
            </button>
          </div>
        </div>
      }
      modal
      nested
      contentStyle={{
        animation: "fadeInScale 0.3s ease-in-out",
        width: "fit-content",
        borderRadius: "8px",
        background: "transparent",
        border: "none",
        padding: "0 20px",
      }}
    >
      {(close) => (
        <div className="p-5 pr-7 rounded shadow-lg bg-white mx-auto relative transform transition-all duration-300 max-w-[770px]">
          <button
            onClick={close}
            className="absolute outline-0 top-2 right-3 text-gray-500 hover:text-red-500 text-3xl font-bold transition-colors duration-200 cursor-pointer"
          >
            ×
          </button>
          <div className="flex sm:flex-row flex-col gap-5">
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-auto sm:mb-0 mb-4 rounded transform transition-transform duration-300 max-w-[250px] sm:mx-0 mx-auto aspect-[4/5] object-cover"
            />
            <div className="w-full grow">
              <div className="grow mb-3">
                <button
                  disabled={updateUserMutation.isPending}
                  onClick={() => handleFavoriteToggle(id)}
                  className={`cursor-pointer text-nowrap border flex items-center gap-1 ${
                    isFavorite
                      ? "border-pink-500 bg-pink-500 text-white"
                      : "bg-white border-pink-500 text-pink-500"
                  } px-3 py-[4px] rounded-full shadow hover:bg-pink-500 hover:text-white transition-colors duration-300`}
                >
                  <IoMdHeart className="text-lg mr-1 mb-[2px]" />{" "}
                  {isFavorite ? "Đã yêu thích" : "Yêu thích"}
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 transition-opacity duration-300">
                {name}
              </h2>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl text-red-600 font-semibold">
                  {formatPrice(priceDiscounted)}
                </span>
                <span className="line-through text-sm text-gray-400">
                  {formatPrice(priceOriginal)}
                </span>
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-bold transform transition-transform duration-300">
                  -{discount}%
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-2 transition-opacity duration-300 font-semibold">
                Ngữ pháp Tiếng Anh với lần tái bản 2021 được tác giả Mai Lan
                Hương & Nguyễn Thanh Loan tổng hợp các chủ điểm ngữ pháp trọng
                yếu. Các chủ điểm ngữ pháp được trình bày rõ ràng, chi tiết.
              </p>
              <p className="text-sm text-yellow-600 font-semibold transition-opacity duration-300">
                ⭐ 4.5 / 5 ( 120 đánh giá )
              </p>
              <div>
                <button className="cursor-pointer mt-3 bg-blue-500 text-white px-4 py-[6px] rounded shadow hover:bg-blue-700 transition-colors duration-300">
                  Thêm vào giỏ hàng
                </button>
                <button className="cursor-pointer ml-2 mt-3 bg-green-500 text-white px-4 py-[6px] rounded shadow hover:bg-green-700 transition-colors duration-300">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}

const styles = `
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
