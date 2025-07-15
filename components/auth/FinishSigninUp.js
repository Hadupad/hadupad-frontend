// import { useState, useEffect } from "react";
// import { ChevronLeft, X } from "lucide-react";

// const FinishSigninUp = ({
//   isOpen,
//   onClose,
//   onBack,
//   onComplete,
//   phoneNumber,
//   verificationCode,
// }) => {
//   const [formData, setFormData] = useState({
//     userId: localStorage.getItem("userId"),
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     birthdate: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [passwordErrors, setPasswordErrors] = useState({
//     minLength: false,
//     hasUpperAndLower: false,
//     hasNumberOrSymbol: false,
//     hasSpecialChar: false,
//     containsNameOrEmail: false,
//   });
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [apiErrors, setApiErrors] = useState([]);
//   const [passwordTouched, setPasswordTouched] = useState(false);

//   const validatePassword = (password, firstName, email) => {
//     const errors = {
//       minLength: password.length >= 8,
//       hasUpperAndLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
//       hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
//       hasNumberOrSymbol: /[0-9]/.test(password),
//       containsNameOrEmail:
//         firstName && email
//           ? !(
//               password.toLowerCase().includes(firstName.toLowerCase()) ||
//               password.toLowerCase().includes(email.toLowerCase())
//             )
//           : true,
//     };
//     return errors;
//   };

//   useEffect(() => {
//     const errors = validatePassword(
//       formData.password,
//       formData.firstName,
//       formData.email
//     );
//     setPasswordErrors(errors);

//     const isValid =
//       formData.firstName.trim() !== "" &&
//       formData.lastName.trim() !== "" &&
//       formData.email.trim() !== "" &&
//       formData.birthdate !== "" &&
//       Object.values(errors).every(Boolean);

//     setIsFormValid(isValid);
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setApiErrors([]);

//     if (name === "password" && !passwordTouched && value.length > 0) {
//       setPasswordTouched(true);
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormValid) return;

//     setIsLoading(true);
//     setApiErrors([]);

//     try {
//       // Simulate success without actual API
//       const userData = {
//         ...formData,
//         phoneNumber,
//         verificationCode,
//       };

//       // Simulate async delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       onComplete(userData); // Call parent callback
//     } catch (error) {
//       setApiErrors([{ message: "An unknown error occurred. Please try again." }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//       <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 relative">
//         <button
//           onClick={onClose}
//           className="absolute right-4 text-gray-600 hover:text-black"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-center text-lg font-semibold mb-6">
//           Finish signing up
//         </h2>

//         <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
//           <input
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
//             placeholder="First name"
//             required
//           />

//           <div>
//             <input
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
//               placeholder="Last name"
//               required
//             />
//             <p className="text-[10px] text-neutral-500 mt-1">
//               Make sure it matches the name on your government ID.
//             </p>
//           </div>

//           <div>
//             <input
//               name="birthdate"
//               value={formData.birthdate}
//               onChange={handleChange}
//               className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
//               type="date"
//               required
//             />
//             <p className="text-[10px] text-neutral-500 mt-1">
//               To sign up, you need to be at least 18.
//             </p>
//           </div>

//           <div>
//             <input
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
//               type="email"
//               placeholder="Email address"
//               required
//             />
//             <p className="text-[10px] text-neutral-500 mt-1">
//               We&apos;ll email your confirmation and receipts.
//             </p>
//           </div>

//           <div className="relative">
//             <input
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none pr-16"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               required
//               minLength={8}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#DC4731] font-medium"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>

//           {/* Password requirement UI here if desired */}

//           {apiErrors.length > 0 && (
//             <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
//               <div className="font-medium mb-2">
//                 Please fix the following issues:
//               </div>
//               <ul className="list-disc pl-5 space-y-1">
//                 {apiErrors.map((error, index) => (
//                   <li key={index}>{error.message}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <p className="text-[10px] text-gray-600 mt-2">
//             By selecting Agree and continue, I agree to the{" "}
//             <a href="#" className="text-[#DC4731] underline">
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-[#DC4731] underline">
//               Privacy Policy
//             </a>
//             .
//           </p>

//           <button
//             type="submit"
//             className={`w-full py-3 mt-2 rounded-xl text-white font-semibold ${
//               !isFormValid || isLoading
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-[#DC4731] hover:bg-[#c03d29]"
//             }`}
//             disabled={!isFormValid || isLoading}
//           >
//             {isLoading ? "Loading..." : "Agree and continue"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FinishSigninUp;


"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const FinishSigninUp = ({ onComplete, phoneNumber, verificationCode }) => {
  const [formData, setFormData] = useState({
    userId: typeof window !== "undefined" ? localStorage.getItem("userId") : "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    minLength: false,
    hasUpperAndLower: false,
    hasNumberOrSymbol: false,
    hasSpecialChar: false,
    containsNameOrEmail: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [apiErrors, setApiErrors] = useState([]);

  const validatePassword = (password, firstName, email) => ({
    minLength: password.length >= 8,
    hasUpperAndLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasNumberOrSymbol: /[0-9]/.test(password),
    containsNameOrEmail:
      firstName && email
        ? !(
            password.toLowerCase().includes(firstName.toLowerCase()) ||
            password.toLowerCase().includes(email.toLowerCase())
          )
        : true,
  });

  useEffect(() => {
    const errors = validatePassword(
      formData.password,
      formData.firstName,
      formData.email
    );
    setPasswordErrors(errors);

    const isValid =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.birthdate !== "" &&
      Object.values(errors).every(Boolean);

    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApiErrors([]);

    if (name === "password" && !passwordTouched && value.length > 0) {
      setPasswordTouched(true);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      const userData = {
        ...formData,
        phoneNumber,
        verificationCode,
      };
      await new Promise((res) => setTimeout(res, 1000));
      if (onComplete) onComplete(userData);
    } catch (err) {
      setApiErrors([
        { message: "An unknown error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={() => window.history.back()}
          className="absolute right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-center text-lg font-semibold mb-6">
          Finish signing up
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
            placeholder="First name"
            required
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
            placeholder="Last name"
            required
          />

          <input
            name="birthdate"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
            required
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
            placeholder="Email"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none pr-16"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#DC4731] font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* ✅ Password Requirements */}
          {passwordTouched && (
            <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
              <li className={passwordErrors.minLength ? "text-green-600" : ""}>
                Minimum 8 characters
              </li>
              <li
                className={
                  passwordErrors.hasUpperAndLower ? "text-green-600" : ""
                }
              >
                Uppercase and lowercase letters
              </li>
              <li
                className={
                  passwordErrors.hasNumberOrSymbol ? "text-green-600" : ""
                }
              >
                At least one number
              </li>
              <li
                className={
                  passwordErrors.hasSpecialChar ? "text-green-600" : ""
                }
              >
                At least one special character
              </li>
              <li
                className={
                  passwordErrors.containsNameOrEmail ? "text-green-600" : ""
                }
              >
                Doesn’t contain your name or email
              </li>
            </ul>
          )}

          {apiErrors.length > 0 && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {apiErrors.map((err, idx) => (
                <p key={idx}>{err.message}</p>
              ))}
            </div>
          )}

          <p className="text-[10px] text-gray-600 mt-2">
            By selecting Agree and continue, I agree to the{" "}
            <a href="#" className="text-[#DC4731] underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#DC4731] underline">
              Privacy Policy
            </a>
            .
          </p>

          <button
            type="submit"
            className={`w-full py-3 mt-2 rounded-xl text-white font-semibold ${
              !isFormValid || isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#DC4731] hover:bg-[#c03d29]"
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Loading..." : "Agree and continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinishSigninUp;
