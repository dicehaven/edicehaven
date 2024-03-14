
import React, { useState } from "react";
import logo from "../assets/images/bg-img/bgbg.jpg"

const Login = () => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle login
    if (username === "example" && password === "password") {
      // Successful login
      alert("Login successful!");
    } else {
      // Failed login
      alert("Invalid username or password!");
    }
  };

  const title = (
    <h2>Welcome Back</h2>
)
const desc = "Explore your own collections of boardgames!"


  return (
        <div>
            <div className="banner-section style-4">
            <div className="container">
                <div className="banner-content">
                {title}
               
                    <p>{desc}</p>
                    <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
    
    <div class=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
      <div class="relative mb-4">
        <label for="full-name" class="leading-7 text-sm text-gray-600">User Name</label>
        <input type="text" id="full-name" name="full-name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
      </div>
      <div class="relative mb-4">
        <label for="email" class="leading-7 text-sm text-gray-600">Password</label>
        <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
      </div>
      <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sumbit</button>
    
    </div>
  </div>
</section>
                </div>
            </div>
        </div>

    
    </div> 
  );
};

export default Login;
