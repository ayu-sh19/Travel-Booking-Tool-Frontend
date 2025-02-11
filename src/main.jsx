import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import Search from "./Search.jsx";
import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { RouterProvider } from "react-router-dom";
import Book from "./Book.jsx";
import BookingConfirmation from "./BookingConfirmation.jsx";
import HotelList from "./HotelList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Search />,
      },
      {
        path: "/search-results",
        element: <HotelList />,
      },
      {
        path: "/book-hotel/:id",
        element: <Book />,
      },
      {
        path: "/booking-confirmation/:offerId",
        element: <BookingConfirmation />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
