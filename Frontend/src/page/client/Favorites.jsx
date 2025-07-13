import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Favorites from "../../components/client/favorites/Favorites.jsx";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useSelector } from "react-redux";

export default function FavoritesPage() {
  useScrollToTop();
  const navigate = useNavigate();
  const { user, isAuthReady } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthReady && !user) {
      navigate("/");
    }
  }, [isAuthReady, user, navigate]);

  return <Favorites />;
}
