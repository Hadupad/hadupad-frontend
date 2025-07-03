import { useState, useEffect } from "react";
import { ChevronLeft, X } from "lucide-react";
import axios from "axios";

const FinishSigninUp = ({
  isOpen,
  onClose,
  onBack,
  onComplete,
  phoneNumber,
  verificationCode,
}) => {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId"),
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    minLength: false,
    hasUpperAndLower: false,
    hasNumberOrSymbol: false,
    containsNameOrEmail: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [apiErrors, setApiErrors] = useState([]); // Now stores an array of errors
  const [passwordTouched, setPasswordTouched] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Password validation function
  const validatePassword = (password, firstName, email) => {
    const errors = {
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
    };
    return errors;
  };

  useEffect(() => {
    const errors = validatePassword(
      formData.password,
      formData.firstName,
      formData.email
    );
    setPasswordErrors(errors);

    // Form is valid only if all password checks pass and other required fields are filled
    const isValid =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.birthdate !== "" &&
      Object.values(errors).every(Boolean); // all true means no errors

    setIsFormValid(isValid);
  }, [formData]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password" && !passwordTouched && value.length > 0) {
      setPasswordTouched(true);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!isFormValid) return;

  //   setIsLoading(true);
  //   setApiError(null); // Clear previous errors

  //   try {
  //     const userData = {
  //       ...formData,
  //       phoneNumber,
  //       verificationCode,
  //     };
  //     console.log("Final submission:", userData);
  //     const response = await axios.post(
  //       `${API_URL}/register/complete`,
  //       formData
  //     );
  //     if (response.status === 200) {
  //       console.log("Registration complete");
  //       onComplete(userData);
  //     } else {
  //     setApiError(response.data?.error || "Registration failed. Please try again.");
  //   }
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //     setApiError(
  //       error.response?.data?.error ||
  //       error.response?.data?.message ||
  //       "An error occurred during registration. Please try again."
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setApiErrors([]); // Clear previous errors

    try {
      const userData = {
        ...formData,
        phoneNumber,
        verificationCode,
      };
      const response = await axios.post(
        `${API_URL}/register/complete`,
        formData
      );

      if (response.status === 200) {
        onComplete(userData);
      } else {
        // Handle non-200 responses that might still contain errors
        setApiErrors(
          response.data?.errors || [
            { message: "Registration failed. Please try again." },
          ]
        );
      }
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response?.data?.errors) {
        setApiErrors(error.response.data.errors);
      } else {
        setApiErrors([
          {
            message:
              error.response?.data?.message ||
              "An error occurred during registration. Please try again.",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={onBack}
          className="absolute left-4 text-gray-600 hover:text-black"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={onClose}
          className="absolute right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-center text-lg font-semibold mb-6">
          Finish signing up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="First name"
              required
            />
          </div>

          <div>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="Last name"
              required
            />
            <p className="text-[10px] text-neutral-500 mt-1">
              Make sure it matches the name on your government ID.
            </p>
          </div>

          <div>
            <input
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
              type="date"
              required
            />
            <p className="text-[10px] text-neutral-500 mt-1">
              To sign up, you need to be at least 18. Your birthday won&apos;t
              be shared with others.
            </p>
          </div>

          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
              type="email"
              placeholder="Email address"
              required
            />
            <p className="text-[10px] text-neutral-500 mt-1">
              We&apos;ll email your confirmation and receipts.
            </p>
          </div>

          <div className="relative">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none pr-16"
              type={showPassword ? "text" : "password"}
              placeholder="Password: 8+ chars, upper/lowercase, number & symbol."
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-sm text-[#DC4731] font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

{passwordTouched && (
  <ul className="text-[12px]">            <li
              className={`flex items-center gap-2 ${
                passwordErrors.minLength ? "text-green-600" : "text-red-600"
              }`}
            >
              {passwordErrors.minLength ? (
                <svg
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
              )}
              At least 8 characters
            </li>

            <li
              className={`flex items-center gap-2 ${
                passwordErrors.hasUpperAndLower
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {passwordErrors.hasUpperAndLower ? (
                <svg
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
              )}
              Contains uppercase and lowercase letters
            </li>

            <li
              className={`flex items-center gap-2 ${
                passwordErrors.hasNumberOrSymbol
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {passwordErrors.hasNumberOrSymbol ? (
                <svg
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
              )}
              Contains a number
            </li>

            <li
              className={`flex items-center gap-2 ${
                passwordErrors.hasSpecialChar
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {passwordErrors.hasSpecialChar ? (
                <svg
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
              )}
              Contains a special character (e.g. @)
            </li>

            <li
              className={`flex items-center gap-2 ${
                passwordErrors.containsNameOrEmail
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {passwordErrors.containsNameOrEmail ? (
                <svg
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
              )}
              Can't contain your name or email address
            </li>
          </ul>
          )}
          {/* Add this right above the terms paragraph */}
          {apiErrors.length > 0 && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
                <span className="font-medium">
                  Please fix the following issues:
                </span>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {apiErrors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Terms and submit button */}
          <p className="text-[10px] text-gray-600 mt-2">
            By selecting Agree and continue, I agree to the{" "}
            <a href="#" className="text-[#DC4731] underline">
              Terms of Service
            </a>
            ,{" "}
            <a href="#" className="text-[#DC4731] underline">
              Payments Terms of Service
            </a>
            , and{" "}
            <a href="#" className="text-[#DC4731] underline">
              Nondiscrimination Policy
            </a>
            , and acknowledge the{" "}
            <a href="#" className="text-[#DC4731] underline">
              Privacy Policy
            </a>
            .
          </p>

          <button
            type="submit"
            className={`w-full py-3 mt-2 rounded-xl cursor-pointer text-white font-semibold transition ${
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
