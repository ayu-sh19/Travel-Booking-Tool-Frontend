import React, { useState } from "react";
import useTheme from "../context/context";
import { IoSunny, IoMoon } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useDispatch } from "react-redux";
import { setTheme } from "../store/authSlice";

function ThemeButton() {
  const [dark, setDark] = useState(false);
  const { lightTheme, darkTheme } = useTheme();
  const dispatch = useDispatch();
  const themeToggle = () => {
    setDark(!dark);
    dispatch(setTheme(dark));
    if (dark) darkTheme();
    else lightTheme();
  };
  return (
    <IconContext value={{color:'white'}}>
      <div className="bg-yellow">
        <button onClick={themeToggle}>
          {dark && <IoMoon />}
          {!dark && <IoSunny />}
        </button>
      </div>
    </IconContext>
  );
}

export default ThemeButton;
