import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineCamera } from "react-icons/hi";
import { LogOut, User } from "lucide-react";
import { images } from "../constants";
import { stables } from "../constants";
import { logout } from "../store/actions/user";
import { getUserProfile } from "../services/index/users";

const navItemsInfo = [
  { name: "Home", href: "/" },
  { name: "Articles", href: "/feed" },
];

const ProfilePictureComponent = ({ avatar, className = "" }) => {
  return avatar ? (
    <img
      src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
      alt="profile"
      className={`w-full h-full object-cover ${className}`}
    />
  ) : (
    <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
      <HiOutlineCamera className="w-7 h-auto text-primary" />
    </div>
  );
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const userState = useSelector((state) => state.user);

  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profileHeader"],
    enabled: !!userState.userInfo,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img className="h-10" src={images.blog_pulse_logo} alt="logo" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navItemsInfo.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-lg font-semibold ${
                  location.pathname === item.href
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                } transition-colors relative group`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            {userState.userInfo ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {profileIsLoading ? (
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-300">
                        <User className="w-9 h-9 flex flex-col text-gray-400" />
                      </div>
                    ) : (
                      <ProfilePictureComponent 
                        avatar={profileData?.avatar}
                        className="w-full h-full" 
                      />
                    )}
                  </div>
                  <span className="font-semibold">{userState.userInfo.name}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="flex items-center w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}