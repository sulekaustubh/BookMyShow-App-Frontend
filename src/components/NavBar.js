import React from "react";
import SignIn from "./User/SignIn";
import SignUp from "./User/SignUp";
import MovieDetails from "./MovieDetails";
import logo from "../assets/BMSlogo.png"
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function NavBar() {
  
  //Redirect page towards specified path
  const navigate = useNavigate();
  
  //handle function for Log-out
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <>
      <div>
        {/*------ <Router> -----*/}
        <div>
          <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
              {/* Book My Show Ticket Booking Page Link */}
              <div className="">
                <Link to={"/sign-in"}>
                  <img 
                  className="w-36 animate-pulse"
                  src={logo} alt=""/>
                </Link>
              </div>      
              {/* store JWT Authentication token generated in localStorage */}
              {!localStorage.getItem("token") ? (
                <div className="px-6 space-x-4">
                  
                  {/* Sign-in button */}
                  <Link to={"/sign-in"}>
                    <button
                      type="button"
                      className={`inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out`}
                    >
                      Sign In
                    </button>
                  </Link>
                  &nbsp;&nbsp;
                  {/* Sign-up button */}
                  <Link to={"/sign-up"}>
                    <button
                      type="button"
                      className={`inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out`}
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              ) : (
                
                // Log-out button
                <button
                  type="button"
                  className={`inline-block px-6 py-2.5 bg-red-400 text-white text-xs leading-tight uppercase rounded-md font-bold shadow-md hover:bg-red-500 hover:shadow-lg focus:bg-red-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-600 active:shadow-lg transition duration-150 ease-in-out`}
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
          
          <div>
            <div>
              
              {/* Specified routing paths */}
              <Routes>
                <Route exact path="/" element={<SignIn />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/bms" element={<MovieDetails />} />
              </Routes>
            </div>
          </div>
        </div>
        {/*----- </Router>----- */}
      </div>
    </>
  );
}

export default NavBar;