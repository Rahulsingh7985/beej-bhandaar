import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/decqt0izm/image/upload/v1766206433/logo4_tyuruo.png"
              className="h-16 w-32"
              alt="Logo"
            />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Menu */}
          <div
            className={`w-full lg:flex lg:w-auto lg:order-1 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 font-medium">
              {["/", "/about", "/contact"].map((path, i) => (
                <li key={i}>
                  <NavLink
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-3 ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } hover:text-orange-700`
                    }
                  >
                    {path === "/" ? "Home" : path.replace("/", "")}
                  </NavLink>
                </li>
              ))}

              {user?.role === "admin" && (
                <li>
                  <NavLink
                    to="/admin/posts"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-3 text-gray-700 hover:text-orange-700"
                  >
                    Admin Panel
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center lg:order-2">
            {user ? (
              <>
                <span className="mr-4">Hello, {user.fullName || user.name}</span>
                <button
                  onClick={logout}
                  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="ml-2 px-4 py-2 text-sm text-white bg-orange-700 hover:bg-orange-800 rounded-lg"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
