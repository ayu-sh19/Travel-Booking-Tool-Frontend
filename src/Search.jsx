import React from "react";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Search() {
  const { control, register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState([]);
  // const authToken = useSelector((state) => state.auth.userAuthToken);

  // console.log(authToken);
  const hotelSearch = async (data) => {
    // e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const cityCode = data.cityCode;
      console.log(cityCode);
      const checkInDate = format(data.checkInDate, "yyyy-MM-dd");
      const checkOutDate = format(data.checkOutDate, "yyyy-MM-dd");
      console.log(checkInDate);
      const response = await axios.get(
        "http://localhost:6969/api/hotel-offers",
        {
          params: { cityCode, checkInDate, checkOutDate },
        }
      );
      console.log(response.data.data);
      setHotels(response.data.data || []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setError("Failed to fetch hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center mt-4 mr-20 ml-20 justify-center  flex-col">
      <div
        className={`mx-auto w-full  bg-gray-100 rounded-xl p-10 border border-black/10 flex flex-col`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Search Hotels
        </h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit(hotelSearch)} className="mt-8">
            <div className="space-y-5 flex flex-col items-center justify-center ">
              <div className=" flex justify-center gap-10">
                <Box
                  sx={{ "& > :not(style)": { width: "231px" } }}
                  noValidate
                  autoComplete="on"
                >
                  <Controller
                    name="cityCode"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        label="Location"
                        variant="outlined"
                      />
                    )}
                  />{" "}
                </Box>

                <Controller
                  name="checkInDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      label="Check In Date"
                      value={field.value}
                      format="DD-MM-YYYY"
                      onChange={(checkInDate) => field.onChange(checkInDate)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  )}
                />
                <Controller
                  name="checkOutDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      label="Check Out Date"
                      value={field.value}
                      format="DD-MM-YYYY"
                      onChange={(checkOutDate) => field.onChange(checkOutDate)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  )}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                style={{ width: "100px", height: "40px" }}
              >
                {loading ? (
                  <div className="flex items-center gap-1">
                    <CircularProgress size={18} />
                    {/* <h4 className="text">Loading</h4> */}
                  </div>
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </form>
        </LocalizationProvider>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex flex-col mt-10">
        {!error ? <HotelList hotels={hotels} /> : ""}
      </div>
    </div>
  );
}

function HotelList({ hotels }) {
  console.log(hotels);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  if (!hotels || hotels.length === 0) {
    return (
      <div className="mt-5">
        <p>No hotels found. Try a different search.</p>
      </div>
    );
    // return (<div>
    //   <img src={globe} alt="loading..." />
    // </div>)
  }
  return (
    <div>
      <h2>Hotel Offers</h2>
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
            className="rounded-2xl items-center"
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
              disabled={loading}
              style={{ width: "100px", height: "40px" }}
              onClick={() => navigate(`/book-hotel/${hotel.offers[0].id}`)}
            >
              {loading ? (
                <div className="flex items-center gap-1">
                  <CircularProgress size={18} />
                </div>
              ) : (
                "Book"
              )}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
