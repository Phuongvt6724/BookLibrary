import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/client/AppLayout.jsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Home from "./page/client/Home.jsx";
import Category from "./page/client/Category.jsx";
import LoginPage from "./page/client/Login.jsx";
import Favorites from "./page/client/Favorites.jsx";
import ViewHistoryPage from "./page/client/ViewHistory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/view-history",
        element: <ViewHistoryPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
