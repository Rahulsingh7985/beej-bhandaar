// import React from "react";
// import { Link } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import  {useState, useContext} from 'react';
// import UserContext from '../../context/UserContext';
// const Register = () => {

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [address, setAddress] = useState('');

//   const {user, setUser} = useContext(UserContext);

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setUser({name, address, email, password});
//   }

//   const handleGoogleLogin = () => {
//     // later connect this with Firebase / backend Google OAuth
//     console.log("Google login clicked");
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex items-center justify-center ">
//       <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md">

//         <h2 className="text-3xl font-bold mb-4 text-center">Create Account</h2>
//         <p className="text-gray-400 text-sm mb-6 text-center">
//           Already have an account?{" "}
//           <Link to="/login" className="text-orange-700 hover:underline">
//             Log in
//           </Link>
//         </p>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition mb-5"
//         >
//           <FcGoogle size={22} />
//           <span className="font-medium">Continue with Google</span>
//         </button>

//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="px-3 text-gray-400 text-sm">OR</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         <form className="space-y-4">


//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name"
//             className="w-full px-4 py-3 rounded-md bg-[#f1f0f5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />

//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="address"
//             className="w-full px-4 py-3 rounded-md bg-[#f1f0f5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />


//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="w-full px-4 py-3 rounded-md bg-[#f1f0f5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />

//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             className="w-full px-4 py-3 rounded-md bg-[#f1f0f5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />

//           <button
//             type="submit"
//             className="w-full py-3 bg-orange-600 hover:bg-orange-700 rounded-md font-semibold text-white transition"
//           >
//             Create Account
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import UserContext from "../../context/UserContext";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !address) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v2/users/register",
        {
          fullName: name,
          email,
          password,
          address
        },
        { withCredentials: true } // cookies ke liye
      );

      console.log(res.data);

      setUser(res.data.data); // Context me save user
      alert("User Registered Successfully");

      // Optional: redirect to login or home page
      // navigate("/login");

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Create Account</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-700 hover:underline">
            Log in
          </Link>
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition mb-5"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Continue with Google</span>
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-3 rounded-md bg-[#f1f0f5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full px-4 py-3 rounded-md bg-[#f1f0f5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md bg-[#f1f0f5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-[#f1f0f5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 rounded-md font-semibold text-white transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
