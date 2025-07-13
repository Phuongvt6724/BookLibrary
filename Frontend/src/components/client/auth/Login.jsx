import { useState } from "react";
import { usersApi } from "../../../services/usersApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const allUsers = await usersApi.getAllUser();
    const foundUser = allUsers.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      toast.success("Đăng nhập thành công!");
      setLoginData({ email: "", password: "" });
      window.location.href = "/";
    } else {
      toast.error("Email hoặc mật khẩu không chính xác.");
    }
  };

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const createUserMutation = useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      toast.success("Đăng ký thành công!");
      setActiveTab("login");
    },
    onError: () => {
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    },
  });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const allUsers = await usersApi.getAllUser();
    const emailExists = allUsers.some((user) => user.email === registerData.email);
    setLoading(false);

    if (emailExists) {
      toast.error("Email này đã được sử dụng.");
      return;
    }

    if (!registerData.terms) {
      toast.error("Bạn cần đồng ý với điều khoản và điều kiện.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Mật khẩu không khớp.");
      return;
    }

    const newUser = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      productsFavorite: [],
      behavior: ["ngu-phap", "luyen-thi-toeic"],
      history: [],
    };

    createUserMutation.mutate(newUser);
  };

  return (
    <div className="flex flex-col justify-center py-12 px-6 lg:px-8 max-w-[600px] mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="sm:mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          Chào mừng bạn đến với Antoree
        </h2>
      </div>

      <div className="flex border-b border-gray-200 mt-6">
        <button
          onClick={() => setActiveTab("login")}
          className={`py-4 px-1 border-b-2 border-green-500 flex-1 text-center cursor-pointer font-semibold ${
            activeTab === "login"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Đăng nhập
        </button>
        <button
          onClick={() => setActiveTab("register")}
          className={`py-4 px-1 border-b-2 border-green-500 flex-1 text-center cursor-pointer font-semibold ${
            activeTab === "register"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Đăng ký
        </button>
      </div>

      {activeTab === "login" && (
        <div className="space-y-6 pt-6">
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleLoginChange}
                placeholder="Địa chỉ email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black "
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleLoginChange}
                placeholder="Mật khẩu"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black "
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-black hover:text-gray-700"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <button
              disabled={createUserMutation.isPending}
              type="submit"
              className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 font-semibold hover:bg-gray-800 focus:outline-none"
            >
              {createUserMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "register" && (
        <div className="space-y-6 pt-6">
          <form className="space-y-6" onSubmit={handleRegisterSubmit}>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Họ và tên"
                value={registerData.name}
                onChange={handleRegisterChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black "
              />
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Địa chỉ email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black "
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Mật khẩu"
                value={registerData.password}
                onChange={handleRegisterChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black "
              />
            </div>
            <div>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Nhập lại mật khẩu"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black "
              />
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                checked={registerData.terms}
                onChange={handleRegisterChange}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700 pt-1"
              >
                Tôi đồng ý với{" "}
                <a
                  href="#"
                  className="font-medium text-black hover:text-gray-700"
                >
                  Điều khoản và điều kiện
                </a>
              </label>
            </div>

            <button
              disabled={createUserMutation.isPending || loading}
              type="submit"
              className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 font-semibold hover:bg-gray-800 focus:outline-none"
            >
              {createUserMutation.isPending || loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
