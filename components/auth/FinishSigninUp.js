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

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      console.log("Final submission:", userData);
      const response = await axios.post(
        `${API_URL}/register/complete`,
        formData
      );
      if (response.status === 200) {
        console.log("Registration complete");
        onComplete(userData);
      }
    } catch (error) {
      console.error("Registration failed:", error);
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
            <p className="text-xs text-neutral-500 mt-1">
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
            <p className="text-xs text-neutral-500 mt-1">
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
            <p className="text-xs text-neutral-500 mt-1">
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#DC4731] font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Password validation feedback */}
          <ul className="text-sm mt-2 space-y-1">
            <li
              className={`flex items-center gap-2 ${
                passwordErrors.minLength ? "text-green-600" : "text-red-600"
              }`}
            >
              {passwordErrors.minLength ? "✔" : "✘"} At least 8 characters
            </li>
            <li
              className={`flex items-center gap-2 ${
                passwordErrors.hasUpperAndLower
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {passwordErrors.hasUpperAndLower ? "✔" : "✘"} Contains uppercase
              and lowercase letters
            </li>
            <li
              className={`flex items-center gap-2 ${
                passwordErrors.hasNumberOrSymbol
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {passwordErrors.hasNumberOrSymbol ? "✔" : "✘"} Contains a number
            </li>
            <li
              className={`flex items-center gap-2 ${
                passwordErrors.hasSpecialChar
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {passwordErrors.hasSpecialChar ? "✔" : "✘"} Contains a special
              character (e.g. @)
            </li>
            <li
              className={`flex items-center gap-2 ${
                passwordErrors.containsNameOrEmail
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {passwordErrors.containsNameOrEmail ? "✔" : "✘"} Can&apos;t
              contain your name or email address
            </li>
          </ul>

          {/* Terms and submit button */}
          <p className="text-xs text-gray-600 mt-2">
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
            className={`w-full py-3 mt-2 rounded-xl text-white font-semibold transition ${
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
