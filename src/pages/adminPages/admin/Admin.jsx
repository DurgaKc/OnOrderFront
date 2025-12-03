import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { IoIosArrowDown } from "react-icons/io";

export default function Admin() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center focus:outline-none"
      >
        <div className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold">
         <PersonIcon />
        </div>
        <IoIosArrowDown className="ml-1 text-lg" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-gradient-to-r from-green-100 via-green-100 to-red-100 rounded-lg shadow-lg border border-green-200 z-50">
          {/* Header */}
          <div className="flex items-center p-3 border-b border-green-100">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mr-3">
              A
            </div>
            <div>
              <p className="font-semibold text-green-800">Admin User</p>
              <p className="text-sm text-green-700">news112@gmail.com</p>
            </div>
          </div>

          {/* Menu Items */}
          <Link
            to="/admin/user-profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-green-800 font-medium hover:bg-green-200 transition-colors"
          >
            👤 Profile
          </Link>
          <Link
            to="/admin/password-change"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-green-800 font-medium hover:bg-green-200 transition-colors"
          >
            🔑 Change Password
          </Link>
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-red-600 font-semibold hover:bg-red-200 transition-colors"
          >
            🚪 Logout
          </Link>
        </div>
      )}
    </div>
  );
}
