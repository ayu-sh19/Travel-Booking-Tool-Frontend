import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Search from "./pages/Search.jsx";
import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { RouterProvider } from "react-router-dom";
import Book from "./pages/ReviewBooking.jsx";
import BookingConfirmation from "./pages/BookingConfirmation.jsx";
import HotelList from "./pages/HotelList.jsx";
import Login from "./pages/Login.jsx";
import AuthLayout  from "./AuthLayout.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/search",
        element: (
          <AuthLayout authentication>
            <Search />
          </AuthLayout>
        ),
      },
      {
        path: "/search-results",
        element: (
          <AuthLayout authentication>
            <HotelList />
          </AuthLayout>
        ),
      },
      {
        path: "/book-hotel/:id",
        element: (
          <AuthLayout authentication>
            <Book />
          </AuthLayout>
        ),
      },
      {
        path: "/booking-confirmation/:offerId",
        element: (
          <AuthLayout authentication>
            <BookingConfirmation />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
