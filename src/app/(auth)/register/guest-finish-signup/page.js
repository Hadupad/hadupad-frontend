"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const FinishSignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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

  // Get phone number and verification code from query params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const phoneNumber = params.get("phone");
      const verificationCode = params.get("code");

      // You can store these in state or context if needed
    }
  }, []);

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
        // Add phone and verification code 
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ✅ Redirect to guest profile creation
      router.push("/register/guest-profile");
    } catch (err) {
      setApiErrors([
        { message: "An unknown error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-sm p-6 relative">
        <button
          onClick={() => router.back()}
          className="absolute left-4 text-gray-600 hover:text-black"
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">
          Complete Your Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                placeholder="First name"
                required
              />
            </div>
            <div>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div>
            <input
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              You must be at least 18 years old to register
            </p>
          </div>

          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              placeholder="Email address"
              required
            />
          </div>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm pr-12"
              placeholder="Create password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#DC4731]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {passwordTouched && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-xs font-medium mb-2">
                Password Requirements
              </h4>
              <ul className="text-xs space-y-1">
                <li
                  className={
                    passwordErrors.minLength ? "text-green-600" : "text-red-500"
                  }
                >
                  • At least 8 characters
                </li>
                <li
                  className={
                    passwordErrors.hasUpperAndLower
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  • Both uppercase and lowercase letters
                </li>
                <li
                  className={
                    passwordErrors.hasNumberOrSymbol
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  • At least one number
                </li>
                <li
                  className={
                    passwordErrors.hasSpecialChar
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  • At least one special character
                </li>
              </ul>
            </div>
          )}

          {apiErrors.length > 0 && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
              {apiErrors.map((error, index) => (
                <p key={index}>{error.message}</p>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              isFormValid && !isLoading
                ? "bg-[#DC4731] hover:bg-[#c03d29]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Processing..." : "Complete Registration"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our{" "}
            <a href="#" className="text-[#DC4731] underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#DC4731] underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default FinishSignupPage;
