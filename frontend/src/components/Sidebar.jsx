import React from "react";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";

const Sidebar = () => {
  const authuser = false;
  return (
    <aside className="flex flex-col items-center min-w-2 sm:w-16 sticky top-0 h-screen py-8 overflow-y-auto border-r backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
      <nav className="h-full flex flex-col gap-3">
        <Link to="/" className="flex justify-center">
          <img className="h-8 " src="/github.svg" alt="Github Logo" />
        </Link>

        <Link
          to="/"
          className="p-1.5 flex justify-center transition-colors duration-200 rounded -lg hover:bg-gray-800"
        >
          <IoHomeSharp size={20} />
        </Link>

        {authuser && (
          <Link
            to="/ikes"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded -lg hover:bg-gray-800"
          >
            <FaHeart size={22} />
          </Link>
        )}

        {authuser && (
          <Link
            to="/explore"
            className="p-1.5 flex justify-center transition-colors duration-200 rounded -lg hover:bg-gray-800"
          >
            <MdOutlineExplore size={25} />
          </Link>
        )}

        {!authuser && (
          <Link
            to="/login"
            className="p-1.5 focus:outline-nones transition-colors duration-200 rounded -lg hover:bg-gray-800"
          >
            <PiSignInBold size={25} />
          </Link>
        )}

        {!authuser && (
          <Link
            to="/signup"
            className="p-1.5 focus:outline-nones transition-colors  duration-200 rounded-lg hover:bg-gray-800"
          >
            <MdEditDocument size={25} />
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
