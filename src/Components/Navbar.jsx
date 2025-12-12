/* Navbar.js */
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";

const Navbar = ({ setSidebar }) => {
  return (
    <nav className="flex items-center py-2.5 px-5 justify-between shadow-md bg-white sticky top-0 z-50">
      <div className="flex items-center">
        <img
          onClick={() => setSidebar((prev) => !prev)}
          src={assets.menu}
          alt="menu"
          className="w-6 mr-4 block md:hidden cursor-pointer"
        />
        <Link to="/">
          <img className="w-28 md:w-32" src={assets.logo_1} alt="logo" />
        </Link>
      </div>

      <div className="hidden sm:flex items-center mr-3 py-2 px-4 rounded-full border border-gray-300 min-w-[180px] md:min-w-[350px] lg:min-w-[450px]">
        <input
          className="w-full border-none outline-none bg-transparent text-sm md:text-base"
          type="text"
          placeholder="Search"
        />
        <img className="w-4 ml-2" src={assets.search} alt="search" />
      </div>

      <div className="flex items-center">
        <img className="w-6 mr-4 hidden sm:block" src={assets.upload} alt="" />
        <img className="w-6 mr-4 hidden md:block" src={assets.more} alt="" />
        <img
          className="w-6 mr-4 hidden md:block"
          src={assets.notification}
          alt=""
        />
        <img
          className="rounded-full w-7 h-7"
          src={assets.user_profile}
          alt="user"
        />
      </div>
    </nav>
  );
};

export default Navbar;
