import React from "react";
import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { FaHotel } from "react-icons/fa";
import { MdOutlineFlight } from "react-icons/md";

function Header() {
  return (
    <div>
      <header className="py-7 shadow bg-gray-900 opactity-90">
        <nav className="flex">
          <div className="w-full max-w-7xl mx-auto text-white px-4 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div>Travel</div>
              <FaHotel />
              <MdOutlineFlight />
            </Link>
          </div>
          <ul className="ml-auto mr-12">
            <li>
              <ThemeButton />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
