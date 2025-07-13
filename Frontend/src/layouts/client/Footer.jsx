import { Link } from "react-router-dom";
import zalo from "../../assets/images/zalo.png";
import facebook from "../../assets/images/facebook.png";

export default function Footer() {
  return (
    <footer className="bg-green-500 h-full mt-auto">
      <div className="mx-auto max-w-screen-xl px-3 py-5 text-sm text-white sm:px-5 lg:pt-10">
        <div className="pb-4">
          <div className="flex sm:flex-row flex-col items-center justify-between w-full">
            <span className="text-[16px] font-semibold text-white sm:mt-0 mt-2 block text-center">
              ©All Designed by Vo Thanh Phuong | <Link to="https://info.phuongdev.io.vn/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-blue-500">PhuongDev</Link>
            </span>
            <div className="flex space-x-4 sm:mt-0 mt-5">
              <Link to="https://zalo.me/0911106542" target="_blank" rel="noopener noreferrer">
                <img src={zalo} alt="Zalo" className="h-9 w-9 hover:opacity-80" />
              </Link>
              <Link to="https://www.facebook.com/phuong.vothanh.7737" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" className="h-9 w-9 hover:opacity-80" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
