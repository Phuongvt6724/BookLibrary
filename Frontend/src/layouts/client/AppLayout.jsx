import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BalloonSuggest from "../../components/ui/BalloonMessage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { useSelector } from "react-redux";

export default function AppLayout() {
  const selectedSuggest = useSelector((state) => state.suggest.selectedSuggest);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="bg-white mt-18 h-full">
        <Outlet />
      </div>
      {(isHomePage && !selectedSuggest) && <BalloonSuggest />}
      <Footer />
    </>
  );
}
