import React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { setHotelSearchData } from "./store/authSlice";

function Search() {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState([]);
  const color = "#FFFFFF";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          sizeMedium: {
            color,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color,
            "&.Mui-focused": { color: "white" },
          },
        },
      },
    },
  });

  const search = async (data) => {
    setError(null);

    try {
      const cityCode = data.cityCode;
      const checkInDate = format(data.checkInDate, "yyyy-MM-dd");
      const checkOutDate = format(data.checkOutDate, "yyyy-MM-dd");
      const payload = { cityCode, checkInDate, checkOutDate };

      console.log(payload);
      dispatch(setHotelSearchData(payload));
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setError("Failed to fetch hotels. Please try again.");
    } finally {
      navigate("/search-results");
    }
  };
  return (
    <div
      className="flex fixed overflow-hidden items-center justify-center w-full flex-col bg-[url('./assets/resort.jpg')] bg-cover "
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        className={`mx-auto h-auto  dark:bg-gray-900 dark:border-gray-700 opacity-90 rounded-xl p-10 border  border-black/10 flex flex-col text-white`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Search Hotels
        </h2>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit(search)} className="mt-8">
              <div className="space-y-5 flex flex-col items-center justify-center ">
                <div className=" flex justify-center gap-10 text-gray-900 dark:text-white">
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
                        onChange={(checkOutDate) =>
                          field.onChange(checkOutDate)
                        }
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
                  style={{ width: "100px", height: "40px" }}
                >
                  Search
                </Button>
              </div>
            </form>
          </LocalizationProvider>
        </ThemeProvider>
      </div>
      {error && <p style={{ color: "white" }}>{error}</p>}
      {/* <div className="flex flex-col mt-10">
        {!error ? <HotelList hotels={hotels} /> : ""}
      </div> */}
    </div>
  );
}

export default Search;
