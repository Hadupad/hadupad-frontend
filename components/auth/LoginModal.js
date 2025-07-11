// "use client";

// import { useState, useRef } from "react";
// import { X } from "lucide-react";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook, FaApple } from "react-icons/fa";

// export default function LoginModal({ isOpen, onClose }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();

//   const modalRef = useRef();
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const handleOverlayClick = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);
//   setError(null);

//   try {
//     const response = await axios.post(`${API_URL}/login`, {
//       email,
//       password,
//     });

//     console.log("Login successful:", response.data);

//     // OPTIONAL: Handle token or user data if provided
//     // Example: login(response.data.token);
    
//     onClose();
//   } catch (err) {
//     if (err.response && err.response.status === 401) {
//       setError("Invalid email or password.");
//     } else {
//       setError(err.message || "Login failed.");
//       console.error(err);
//     }
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
//       onClick={handleOverlayClick}
//     >
//       <div
//         ref={modalRef}
//         className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative"
//       >
//         <button
//           onClick={onClose}
//           className="absolute right-4 text-gray-600 hover:text-black"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-lg font-semibold text-center mb-1">Log in</h2>

//         <div className="-mx-4 mt-4 mb-6">
//           <hr className="border-t border-gray-100" />
//         </div>
        

//         {/* Email + Password Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
//             required
//           />

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731] pr-10"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-sm text-gray-600"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>

//           {error && (
//             <div
//               className="p-3 text-sm text-red-800 rounded-lg bg-red-50"
//               role="alert"
//             >
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-2 rounded-lg text-white flex justify-center ${
//               isLoading
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-[#DC4731] hover:bg-[#c03d29]"
//             }`}
//           >
//             {isLoading ? (
//               <span className="loading loading-spinner"></span>
//             ) : (
//               "Log in"
//             )}
//           </button>
//         </form>

//                 {/* Divider */}
//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-t border-gray-200" />
//           <span className="mx-3 text-sm text-gray-400">OR</span>
//           <hr className="flex-grow border-t border-gray-200" />
//         </div>

//         {/* Social Login Buttons */}
//         <div className="space-y-3 mb-4">
//           <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition">
//             <FcGoogle className="mr-2 text-xl" />
//             Continue with Google
//           </button>
//           <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition text-blue-600">
//             <FaFacebook className="mr-2 text-xl" />
//             Continue with Facebook
//           </button>
//           <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition text-black">
//             <FaApple className="mr-2 text-xl" />
//             Continue with Apple
//           </button>
//         </div>

//         <div className="text-center mt-4 text-sm">
//           Don't have an account?{" "}
//           <button className="underline text-[#DC4731] hover:text-[#b33220]">
//             Sign up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef } from "react";
import { X, CheckCircle2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth();

  const modalRef = useRef();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      // Store token or call login() method
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      login(response.data.accessToken); // optional: sets global auth state

      setIsSuccess(true);

      // Auto-close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(err.message || "Login failed.");
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className="text-center py-10">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Login Successful!</h2>
            <p className="text-gray-600">Redirecting you shortly...</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-center mb-1">Log in</h2>

            <div className="-mx-4 mt-4 mb-6">
              <hr className="border-t border-gray-100" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-800 rounded-lg bg-red-50">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 rounded-lg text-white flex justify-center ${
                  isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#DC4731] hover:bg-[#c03d29]"
                }`}
              >
                {isLoading ? (
                  <span className="loading loading-spinner">Logging in...</span>
                ) : (
                  "Log in"
                )}
              </button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-200" />
              <span className="mx-3 text-sm text-gray-400">OR</span>
              <hr className="flex-grow border-t border-gray-200" />
            </div>

            <div className="space-y-3 mb-4">
              <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition">
                <FcGoogle className="mr-2 text-xl" />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition text-blue-600">
                <FaFacebook className="mr-2 text-xl" />
                Continue with Facebook
              </button>
              <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition text-black">
                <FaApple className="mr-2 text-xl" />
                Continue with Apple
              </button>
            </div>

            <div className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <button className="underline text-[#DC4731] hover:text-[#b33220]">
                Sign up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
