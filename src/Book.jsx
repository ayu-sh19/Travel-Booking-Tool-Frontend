import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import globe from "../src/assets/globe.gif";
import { intervalToDuration } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { setBookData } from "./store/authSlice";

function Book() {
  const { id } = useParams();
  // const authToken = useSelector((state) => state.auth.userAuthToken);
  const [hotel, setHotel] = useState();
  const [loading, setLoading] = useState(true);
  const [nights, setNights] = useState();
  const [guestInfo, setGuestInfo] = useState();
  const [guestAdd, setGuestAdd] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, register, handleSubmit } = useForm();

  const theme = createTheme({
    palette: {
      primary: {
        main: yellow[300],
      },
    },
  });

  function formData(data) {
    setGuestInfo(data);
    setGuestAdd(true);
    const payload = dispatch(setBookData({ data }));
    setTimeout(() => setGuestAdd(false), 3000);
    console.log(data);
  }

  async function book() {
    try {
      return await axios.get("http://localhost:3131/api/book-hotel", {
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
      const interval = intervalToDuration({
        start: new Date(hotel?.offers[0]?.checkInDate),
        end: new Date(hotel?.offers[0]?.checkOutDate),
      });
      setNights(interval.days);
      // setState(days);
      setHotel(hotelOffer);
    });
    // .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          columnGap: "10px",
        }}
      >
        <div className="flex flex-col">
          <div className="w-full max-w-5xl p-4 ml-6 mt-5 rounded-2xl mr-auto bg-white border border-gray-200  shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-white">Hotel</h5>
            <div className="flex items-baseline text-2xl text-gray-900 dark:text-white">
              {hotel?.hotel?.name}
            </div>
          </div>
          <div className="w-full max-w-5xl p-4 ml-6 mt-5 rounded-2xl mr-auto bg-white border border-gray-200  shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex flex-col ">
                <span className="text-base font-normal  text-gray-400">
                  Check In Date
                </span>
                <div className="flex items-baseline text-xl text-gray-900 dark:text-white">
                  {hotel?.offers[0]?.checkInDate}
                </div>
              </div>
              <div className="text-white rounded-e-3xl rounded-l-3xl border flex justify-center items-center w-20 h-10">
                <p className="">{nights} Night</p>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-normal  text-gray-400">
                  Check Out Date
                </span>
                <div className="flex items-baseline text-xl text-gray-900 dark:text-white">
                  {hotel?.offers[0]?.checkOutDate}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" mt-5 p-0 mr-6 flex flex-col rounded-2xl shadow-sm sm:p-8 bg-white border border-gray-200  shadow-sm  dark:bg-gray-800 dark:border-gray-700"
          style={{
            gridColumnStart: "2",
            gridRowEnd: "2",
          }}
        >
          <h5 className="mb-4 text-xl font-medium text-white">
            Price Breakdown
          </h5>
          <ul role="list" className="space-y-5 my-1">
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
            <li className="flex mb-2">
              <span className="text-base font-normal text-white ">
                Total Price : {hotel?.offers[0]?.price.currency}{" "}
                {hotel?.offers[0]?.price.total}
              </span>
            </li>
            <div className="flex justify-center items-center h-full">
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
          </ul>
        </div>
      </div>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          columnGap: "10px",
        }}
      >
        <div className="flex flex-col">
          <div className="w-full max-w-5xl p-4 ml-6 mt-5 rounded-2xl mr-auto bg-white border border-gray-200  shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="mt-8" onSubmit={handleSubmit(formData)}>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <label
                      className="inline-block mb-1 pl-1 text-white"
                      htmlFor={id}
                    >
                      Title
                    </label>
                    <select
                      name="title"
                      className={`px-3 py-2.5 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-20`}
                      {...register("title", {
                        required: true,
                      })}
                    >
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="inline-block mb-1 pl-1 text-white"
                      htmlFor={id}
                    >
                      Full Name
                    </label>
                    <input
                      label="FirstName"
                      placeholder="First Name"
                      type="text"
                      className={`px-3 py-2 rounded-lg mt-auto bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-sm`}
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <input
                      label="LastName"
                      placeholder="Last Name"
                      type="text"
                      className={`px-3 py-2 rounded-lg mt-auto bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-sm`}
                      {...register("lastName", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    className="inline-block mb-1 pl-1 text-white"
                    htmlFor={id}
                  >
                    Enter Email
                  </label>
                  <input
                    label="Email:"
                    placeholder="Enter your email"
                    type="email"
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-120`}
                    {...register("email", {
                      required: true,
                      validate: {
                        matchPatern: (value) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            value
                          ) || "Email address must be a valid address",
                      },
                    })}
                  />
                </div>
                <div className="flex items-center gap-5">
                  <ThemeProvider theme={theme}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ width: "150px", height: "40px", color: "black" }}
                    >
                      Add Guest
                    </Button>
                  </ThemeProvider>
                  {!guestAdd ? (
                    ""
                  ) : (
                    <p className="text-white">Guest Added Successfully !</p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className=" w-full fixed overflow-hidden flex items-center h-screen">
      <div className="m-auto w-30 h-30">
        <img src={globe}></img>
      </div>
    </div>
  );
}

export default Book;
