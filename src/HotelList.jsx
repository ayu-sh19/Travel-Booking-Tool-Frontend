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
      <div>
        <p className="text-2xl p-2 text-white">Hotel Offers</p>
        <ul
          style={{ listStyle: "none", padding: 0 }}
          className="flex flex-col gap-4"
        >
          {hotels.map((hotel, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px 0",
                padding: "20px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
              className="rounded-2xl items-center  dark:bg-gray-800 opacity-90 text-white dark:border-gray-700"
            >
              <div className="flex flex-col mr-auto">
                <h3>{hotel.hotel.name}</h3>
                <p>
                  <span className="text-sm">
                    {hotel.offers[0].price.currency}
                  </span>{" "}
                  <span className="text-xl">{hotel.offers[0].price.total}</span>
                </p>
              </div>
              <Button
                type="button"
                variant="contained"
                color="primary"
                style={{ width: "100px", height: "40px" }}
                onClick={() => navigate(`/book-hotel/${hotel.offers[0].id}`)}
              >
                Book
              </Button>
            </li>
          ))}
        </ul>
      </div>
    )
  ) : (
    <div className=" w-full flex items-center h-screen">
      <div className="m-auto w-30 h-30">
        <img src={globe}></img>
      </div>
    </div>
  );
}

export default HotelList;
