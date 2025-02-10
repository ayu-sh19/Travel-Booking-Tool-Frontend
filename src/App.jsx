// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setToken } from "./store/authSlice";

function App() {
  // const dispatch = useDispatch();

  // async function authToken() {
  //   try {
  //     return await axios.get("http://localhost:6969/api/login");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   authToken().then((userAuthToken) => {
  //     const payload = setToken(userAuthToken.data)
  //     console.log(payload);
  //     dispatch(payload);
  //   });
  // }, []);

  return (
    <div className="w-full block">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
