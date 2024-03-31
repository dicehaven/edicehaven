
import React, { useState } from "react";
import logo from "../assets/images/bg-img/bgbg.jpg"
import { authenticate } from "../helpers/auth";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  // State variables for form fields
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { from } = state || { from: { pathname: '/' } };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to handle account creation
    // You can implement this logic based on your backend requirements
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, userName, email, password })
      })

      const data = await response.json();

      if (data && data.success) {
        authenticate(data.token);
        navigate(from, { replace: true });
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert(err.messasge)
      console.log('this is the error', err);
    }
  };

  return (
    <div>
      <div>
        <div className="banner-section style-2">
          <div className="container">
            <div className="banner-content">

            </div>
          </div>
        </div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={logo}
                />
              </div>
              <br />
              <br />
              <h1 className="title-font font-medium text-3xl text-gray-900">
                Welcome to DiceHeaven
              </h1>
              <p className="leading-relaxed mt-4">
                Dive into a World of Strategy and Chance - Join Our Community
                and Explore Endless Fun! Whether You're a Casual Gamer or a
                Hardcore Enthusiast, DiceHeaven Offers Something for Everyone.
                Challenge Friends, Unravel Mysteries, and Create Memories with
                Every Roll. Start Your Journey Today!
              </p>
            </div>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Create Account
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <label
                    htmlFor="full-name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    name="full-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="userName"
                    className="leading-7 text-sm text-gray-600"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
