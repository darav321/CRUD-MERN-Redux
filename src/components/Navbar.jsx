import React, { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";
import { themeToggle } from "../redux/Theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useSearchUserQuery } from "../redux/features/userApi";

const Navbar = ({setFilteredResults, searchTerm, setSearchTerm}) => {
  const theme = useSelector((state) => state.themes.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {data : results} = useSearchUserQuery(searchTerm, {skip : !searchTerm})

  const [searchData, setSearchData] = useState("")

  const themeChange = () => {
    dispatch(themeToggle());
  };

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm = value
    if(results)
    {
      setFilteredResults(results)
    }
  }

  return (
    <header>
      <div
        className={`${
          theme === "light"
            ? "flex justify-between items-center text-black bg-white shadow-md px-8 py-4 "
            : "flex justify-between items-center bg-gray-800 text-gray-100 shadow-md px-8 py-4 "
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate("/home")}>
          <h1 className="font-serif font-bold text-4xl">CRUD</h1>
          <span className="text-sm italic">Manage it all!</span>
        </div>

        {/* Search & Actions Section */}
        <div>
          <ul className="flex items-center gap-6">
            {/* Icon */}
            <li
              onClick={themeChange}
              className="bg-slate-700 p-3 rounded-full hover:bg-slate-600 cursor-pointer"
            >
              {
                theme === "light" ? <IoMoonSharp className="text-white text-md" /> : <IoSunnyOutline className="text-white text-md" />
                }
            </li>

            {/* Search Input */}
            <li>
              <input
                className={`${theme === "light" ? "rounded-full px-5 py-2 text-gray-700 bg-white shadow-md outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 border border-gray-300 w-72" : "rounded-full px-5 py-2 text-gray-200 bg-gray-800 shadow-md outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 w-72"}`}
                type="text"
                placeholder="Search for something..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
