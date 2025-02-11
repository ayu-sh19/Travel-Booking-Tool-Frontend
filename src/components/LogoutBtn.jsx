import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { IoLogOutOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import authService from "../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.userData);
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <IconContext value={{ color: "white" , size: 30 }}>
      <div className="bg-yellow">
        <button onClick={logoutHandler}>
          <IoLogOutOutline />
        </button>
      </div>
    </IconContext>
  );
}

export default LogoutBtn;
