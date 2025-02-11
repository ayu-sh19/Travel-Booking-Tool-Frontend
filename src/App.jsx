// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setToken } from "./store/authSlice";
import Header from "./components/Header";
import { ModeThemeProvider } from "./context/context";

function App() {
  const [themeMode, setThemeMode] = useState("dark");
  const lightTheme = () => {
    setThemeMode("light");
  };
  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <div className="w-full block">
      <ModeThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
        <Header />
        <main>
          <Outlet />
        </main>
      </ModeThemeProvider>
    </div>
  );
}

export default App;
