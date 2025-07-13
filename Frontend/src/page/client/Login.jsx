import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/client/auth/Login.jsx";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useSelector } from "react-redux";

export default function LoginPage() {
  useScrollToTop();
  const navigate = useNavigate();
  const { user, isAuthReady } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthReady && user) {
      navigate("/");
    }
  }, [isAuthReady, user, navigate]);

  return <Login />;
}
