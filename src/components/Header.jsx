import React from "react";
import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { FaHotel } from "react-icons/fa";
import { MdOutlineFlight } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { IconContext } from "react-icons";
import LoginBtn from "./LoginBtn";

function Header() {
  const authStatus = useSelector((state) => {
    return state.auth.status;
  });
  const navigate = useNavigate();
  return (
    <div>
      <header className="py-7 shadow bg-gray-900 opactity-90">
        <nav className="flex">
          <div className="w-full max-w-7xl mx-auto text-white px-4 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="text-3xl">Travel</div>
              <IconContext value={{ size: 30 }}>
                <FaHotel />
                <MdOutlineFlight />
              </IconContext>
            </Link>
          </div>
          <ul className="ml-auto mr-12 justify-center items-center flex gap-10">
            <li>
              <ThemeButton />
            </li>
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            {!authStatus && (
              <li>
                <LoginBtn />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
