import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../redux/categorySlice";
import library from "../../../assets/images/library.svg";
import effect_overlay from "../../../assets/images/library-header-bg.svg";
import { FaCaretDown } from "react-icons/fa";

export default function LibraryHeader() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );

  const handleChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  return (
    <div className="bg-gradient-to-t from-green-500 to-green-500 relative">
      <div className="max-w-screen-xl mx-auto flex md:px-20 sm:px-10 pb-10 px-5 lg:flex-row flex-col-reverse items-center">
        <div className="max-w-xl lg:py-10 py-5 z-10">
          <h1 className="sm:text-5xl text-4xl font-bold text-white mb-2">
            Thư viện ANTOREE
          </h1>
          <p className="text-white sm:leading-6 leading-5 sm:text-sm text-[13px] font-semibold">
            Hệ thống cửa hàng sách tiếng Anh thông minh với hơn 500+ đầu sách
            tiếng Anh đa dạng, từ luyện thi, kỹ năng, đến các cấp độ khác nhau,
            phù hợp cho trẻ em đến người lớn, giúp bạn học dễ dàng, ghi nhớ hiệu
            quả và khám phá tiếng Anh một cách thú vị, khoa học.
          </p>
          <div className="mt-4 relative">
            <select
              value={selectedCategory}
              onChange={handleChange}
              className="w-full p-2 px-3 border-2 rounded-lg bg-white text-primary-700 font-semibold border-b-4 border-green-700 focus:outline-none focus:ring-primary-500 appearance-none pr-8"
            >
              <option value="all">Tất cả</option>
              <option value="ngu-phap">Sách Ngữ Pháp</option>
              <option value="tieng-anh-thieu-nhi">Sách Tiếng Anh Thiếu Nhi</option>
              <option value="luyen-thi-ielts">Sách Luyện Thi IELTS</option>
              <option value="luyen-thi-toeic">Sách Luyện Thi TOEIC</option>
              <option value="tu-vung">Sách Từ Vựng</option>
              <option value="luyen-thi-toefl">Sách Luyện Thi TOEFL</option>
            </select>
            <FaCaretDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-700 pointer-events-none" />
          </div>
        </div>
        <div className="lg:p-14 p-10 grow flex items-center justify-center z-10 pointer-events-none">
          <img src={library} alt="Thư viện" className="lg:min-w-49" />
        </div>
      </div>
      <div className="absolute z-0 bottom-0 left-0 overflow-hidden w-full h-full pointer-events-none">
        <img
          src={effect_overlay}
          alt=""
          className="opacity-50 w-full h-full transform scale-210 sm:scale-100"
        />
      </div>
    </div>
  );
}
