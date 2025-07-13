import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSuggest } from "../../redux/suggestSlice";
import SpinLoading from "./SpinLoading";

export default function BalloonSuggest() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsLoading(true);

    const dispatchTimer = setTimeout(() => {
      dispatch(setSuggest(true));
    }, 1000);

    const scrollTimer = setTimeout(() => {
      const element = document.getElementById("product-suggestions");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });

        const adjustScroll = () => {
          const rect = element.getBoundingClientRect();
          if (Math.abs(rect.top) > 5) {
            requestAnimationFrame(adjustScroll);
          } else {
            window.scrollBy({ top: -100, behavior: "smooth" });
            window.history.replaceState(null, "", window.location.pathname);
          }
        };

        requestAnimationFrame(adjustScroll);
      }

      setIsLoading(false);
    }, 1200);

    return () => {
      clearTimeout(dispatchTimer);
      clearTimeout(scrollTimer);
    };
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className="bottom-6 flex items-center gap-x-2 fixed sm:right-8.5 right-4 z-40 w-auto bg-blue-500 font-semibold text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
    >
      {isLoading ? (
        <SpinLoading />
      ) : (
        <>
          <FaRegQuestionCircle className="sm:text-xl text-lg" />
          <span className="pt-1">Gợi ý sản phẩm phù hợp</span>
        </>
      )}
    </button>
  );
}
