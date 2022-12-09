import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url="https://bookmyshow-project-backend.vercel.app"
  //Redirect page towards Book that Show Ticket Booking App upon successful user sign-in
  const navigate = useNavigate();
  //Endpoint:Fetch API POST request using async/await
  const SignInData = async (e) => {
    e.preventDefault();
    const res = await fetch(url+"/users/signin",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    
    const data = await res.json();
    //Status Code:201 --> Successful user sign-in
    if (data.success) {
      localStorage.setItem("token", data.token);
       //alert message using SweetAlert npm package
      Swal.fire("Book that Show", `Signed In Successfully!`, "success");
      navigate("/bms");
    } 
    //Status Code:404  -->Incorrect email
    else if (data.errors) {
      Swal.fire("Oops..", `${data.errors[0].msg}!`, "error");
    } 
     //Status Code:400  -->Incorrect password
    else {
      Swal.fire("Oops..", `${data.message}!`, "error");
    }
  };
  //handle functions for Email and Password
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  
  return (
    <>
      <div>
        {/* main section of sign-in page */}
        <section className="h-screen">
          <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              
              {/* Sign-in page image */}
              <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                <img
                  src="https://gawvs.in//assets/img/login.png"
                  className="w-full"
                  alt="#"
                />
              </div>
              
              {/* Sign-in form */}
              <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <form>
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0">Sign in</p>
                  </div>

                  {/* Enter user email */}
                  <div className="mb-6">
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Email address"
                      onChange={handleEmail}
                    />
                  </div>

                  {/* Enter user password */}
                  <div className="mb-6">
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Password"
                      onChange={handlePassword}
                    />
                  </div>

                  {/* Sign-in button */}
                  <div className="text-center lg:text-left">
                    <button
                      type="button"
                      className="inline-block px-7 py-3 bg-blue-500 text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={SignInData}
                    >
                      SIGN IN
                    </button>
                    
                    {/* To go to sign-up page if account doesn't exist */}
                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                      Don't have an account?&nbsp;
                      <Link
                        to="/sign-up"
                        className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SignIn;