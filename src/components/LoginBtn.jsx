import React from "react";
import { FaHotel } from "react-icons/fa";
import { MdOutlineFlight } from "react-icons/md";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

function LoginBtn() {
  const navigate = useNavigate();
  const loginPage = () => {
    navigate("/login");
  };
  return (
    <div>
      <button
        type="button"
        onClick={loginPage}
        className="text-white w-full bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-small rounded-lg text-sm px-5 py-2.5   items-center dark:focus:ring-[#3b5998]/55 "
      >
        Login
      </button>
    </div>
  );
}

export default LoginBtn;
