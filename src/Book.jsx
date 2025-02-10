import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import globe from "../src/assets/globe.gif";

function Book() {
  const { id } = useParams();
  // const authToken = useSelector((state) => state.auth.userAuthToken);
  const [hotel, setHotel] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  async function book() {
    try {
      return await axios.get("http://localhost:6969/api/book-hotel", {
        params: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setTimeout(() => setLoading(false), 7000);
    book().then((data) => {
      const hotelOffer = data.data.data;
      setHotel(hotelOffer);
    });
    // .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="flex justify-center h-screen">
      <div className="w-full max-w-sm p-4 m-auto bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Hotel
        </h5>
        <div className="flex items-baseline text-2xl text-gray-900 dark:text-white">
          {hotel?.hotel?.name}
        </div>
        {/* <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">$</span>
          <span className="text-5xl font-extrabold tracking-tight">49</span>
          <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
            /month
          </span>
        </div> */}
        <ul role="list" className="space-y-5 my-7">
          <li className="flex items-center">
            <span className="text-base font-normal  text-white ">
              Check In Date : {hotel?.offers[0]?.checkInDate}
            </span>
          </li>
          <li className="flex">
            <span className="text-base font-normal  text-white ">
              Check In Date : {hotel?.offers[0]?.checkOutDate}
            </span>
          </li>
          <li className="flex">
            <span className="text-base font-normal  text-white ">
              Base Price : {hotel?.offers[0]?.price.currency}{" "}
              {hotel?.offers[0]?.price.base}
            </span>
          </li>
          <li className="flex">
            <span className="text-base font-normal text-white ">
              Taxes : {hotel?.offers[0]?.price.currency}{" "}
              {(
                Number(hotel?.offers[0]?.price.total) -
                Number(hotel?.offers[0]?.price.base)
              ).toFixed(2)}
            </span>
          </li>
          <li className="flex">
            <span className="text-base font-normal text-white ">
              Total Price : {hotel?.offers[0]?.price.currency}{" "}
              {hotel?.offers[0]?.price.total}
            </span>
          </li>
        </ul>
        {/* <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          onClick={() => {
            navigate(`/booking-confirmation/${hotel.offers[0].id}`);
          }}
        >
          Book Now !
        </button> */}

        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ width: "100px", height: "40px" }}
          onClick={() =>
            navigate(`/booking-confirmation/${hotel.offers[0].id}`)
          }
        >
          Book 
        </Button>
      </div>
    </div>
  ) : (
    <div className=" w-full flex items-center h-screen">
      <div className="m-auto w-30 h-30">
        <img src={globe}></img>
      </div>
    </div>
  );
}

export default Book;
