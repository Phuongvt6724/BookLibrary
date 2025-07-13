import ViewHistory from "../../components/client/history/viewHistory.jsx";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function ViewHistoryPage() {
  useScrollToTop();
  const navigate = useNavigate();
  const { user, isAuthReady } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthReady && !user) {
      navigate("/");
    }
  }, [isAuthReady, user, navigate]);

  return <ViewHistory />;
}
