import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import globe from "./assets/globe.gif";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { format } from "date-fns";
import axios from "axios";

function HotelList() {
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const data = useSelector((state) => state.auth.hotelSearchData);

  const navigate = useNavigate();

  const hotelSearch = async (data) => {
    try {
      const cityCode = data.cityCode;
      const checkInDate = format(data.checkInDate, "yyyy-MM-dd");
      const checkOutDate = format(data.checkOutDate, "yyyy-MM-dd");

      const response = await axios.get(
        "http://localhost:3131/api/hotel-offers",
        {
          params: { cityCode, checkInDate, checkOutDate },
        }
      );
      return response.data.data;
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  useEffect(() => {
    hotelSearch(data)
      .then((hotels) => setHotels(hotels))
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    !hotels || hotels.length === 0 ? (
      <div className="mt-5"></div>
    ) : (
      <div className="flex fixed overflow-hidden w-full flex-col items-center bg-[url('./assets/desert.jpg')] bg-cover" style={{
        minHeight: "100vh",
      }}>
        <div >
          <p className="ml-0 text-3xl pt-3 text-gray-900  font-mono">Hotel Offers</p>
        </div>
        <ul class="max-w-lvh m-6 divide-y dark:divide-transparent divide-black  flex flex-col">
          {hotels.map((hotel, index) => (
            <li key={index} class="pb-3 sm:pb-4 ">
              <div class="flex items-center space-x-4 rtl:space-x-reverse dark:bg-gray-900 mx-auto dark:border-gray-700 h-auto p-7 rounded-2xl">
                <div class="flex-1 min-w-0">
                  <p class="text-xl font-medium text-gray-900 truncatetext-gray-900 dark:text-white">
                    {hotel.hotel.name}
                  </p>
                  <p class="text-smtext-gray-900 dark:text-white truncate dark:text-gray-400">
                    <span className="text-sm">
                      {hotel.offers[0].price.currency}
                    </span>{" "}
                    <span className="text-xl">
                      {hotel.offers[0].price.total}
                    </span>
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    style={{ width: "100px", height: "40px" }}
                    onClick={() =>
                      navigate(`/book-hotel/${hotel.offers[0].id}`)
                    }
                  >
                    Book
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  ) : (
    <div className=" w-full fixed flex items-center min-h-screen overflow-hidden">
      <div className="m-auto w-30 h-30">
        <img src={globe}></img>
      </div>
    </div>
  );
}

export default HotelList;
