'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";
import LoadingIndicator from "../LoadingIndicator";
import { signup } from "@/redux/slices/signupSlice";

export default function SignupForm({ onSignupSuccess, onBack, userType, userId }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.signup);

  console.log('SignupForm props:', { userId, userType });
  console.log('SignupForm formData:', formData);

  const isAdult = (dateStr) => {
    if (!dateStr) return false;
    const [yyyy, mm, dd] = dateStr.split('-');
    if (!yyyy || !mm || !dd) return false;
    const dob = new Date(Date.UTC(+yyyy, +mm - 1, +dd));
    const today = new Date();
    const age = today.getUTCFullYear() - dob.getUTCFullYear();
    if (age > 18) return true;
    if (age < 18) return false;
    const monthDiff = today.getUTCMonth() - dob.getUTCMonth();
    if (monthDiff < 0) return false;
    if (monthDiff > 0) return true;
    return today.getUTCDate() >= dob.getUTCDate();
  };

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const isFormValid = () => {
    const valid = (
      formData.firstName.trim().length > 0 &&
      formData.lastName.trim().length > 0 &&
      isEmailValid() &&
      isAdult(formData.birthdate) &&
      formData.password.length >= 8 &&
      userId
    );
    console.log('SignupForm isFormValid:', {
      valid,
      firstName: formData.firstName.trim().length > 0,
      lastName: formData.lastName.trim().length > 0,
      email: isEmailValid(),
      birthdate: isAdult(formData.birthdate),
      password: formData.password.length >= 8,
      userId: !!userId,
    });
    return valid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please complete all required fields correctly.");
      return;
    }
    try {
      const result = await dispatch(signup({ ...formData, userType, userId })).unwrap();
      console.log('SignupForm result:', result);
      toast.success("Signup successful!");
      onSignupSuccess(result);
    } catch (err) {
      console.error('SignupForm error:', err);
      toast.error(err.message || "Signup failed. Please try again.");
    }
  };

  useEffect(() => {
    if (!userId) {
      toast.error("User ID is missing. Please start the registration again.");
      onBack(); // Navigate back to OTP or initiate step
    }
  }, [userId, onBack]);

  return (
    <div className="p-6 sm:p-0 sm:pb-6">
      <div className="hidden sm:block p-4 border-b relative text-center">
        <button
          onClick={onBack}
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-bold">Finish signing up</h3>
      </div>
      <form
        className="w-full max-w-lg mx-auto bg-white rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="px-6 pt-2">
          <label className="block mb-1 text-gray-600 text-sm font-medium">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-lg font-semibold mb-1 focus:outline-none focus:border-black ${
              touched.firstName && !formData.firstName.trim() ? "border-red-500" : "border-gray-200"
            }`}
            autoComplete="given-name"
            required
          />
          {touched.firstName && !formData.firstName.trim() && (
            <p className="text-xs text-red-500 mb-2">First name is required.</p>
          )}
        </div>
        <div className="px-6 pt-2">
          <label className="block mb-1 text-gray-600 text-sm font-medium">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-lg font-semibold mb-1 focus:outline-none focus:border-black ${
              touched.lastName && !formData.lastName.trim() ? "border-red-500" : "border-gray-200"
            }`}
            autoComplete="family-name"
            required
          />
          {touched.lastName && !formData.lastName.trim() && (
            <p className="text-xs text-red-500 mb-2">Last name is required.</p>
          )}
        </div>
        <div className="px-6 pt-2">
          <label className="block mb-1 text-gray-600 text-sm font-medium">
            Birthdate
          </label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-lg font-semibold mb-1 focus:outline-none focus:border-black ${
              touched.birthdate && !isAdult(formData.birthdate) ? "border-red-500" : "border-gray-200"
            }`}
            required
          />
          {touched.birthdate && !isAdult(formData.birthdate) && (
            <p className="text-xs text-red-500 mb-2">You must be at least 18.</p>
          )}
        </div>
        <div className="px-6 pt-2">
          <label className="block mb-1 text-gray-600 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-lg font-semibold mb-1 focus:outline-none focus:border-black ${
              touched.email && !isEmailValid() ? "border-red-500" : "border-gray-200"
            }`}
            autoComplete="email"
            required
          />
          {touched.email && !isEmailValid() && (
            <p className="text-xs text-red-500 mb-2">Enter a valid email.</p>
          )}
        </div>
        <div className="px-6 pt-2">
          <label className="block mb-1 text-gray-600 text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 text-lg font-semibold mb-1 focus:outline-none focus:border-black ${
                touched.password && formData.password.length < 8 ? "border-red-500" : "border-gray-200"
              }`}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {touched.password && formData.password.length < 8 && (
            <p className="text-xs text-red-500 mb-2">Password must be at least 8 characters.</p>
          )}
        </div>
        {error && <p className="px-6 pt-2 text-xs text-red-500 mb-2">{error}</p>}
        <div className="px-6 pt-2 pb-3">
          <p className="text-xs text-gray-500 mb-2">
            By selecting Agree and continue, I agree to our{" "}
            <a href="#" className="underline">Terms of Service</a>,{" "}
            <a href="#" className="underline">Payments Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline">Nondiscrimination Policy</a>{" "}
            and acknowledge the{" "}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white text-base transition ${
              isFormValid() && !loading ? "bg-[#DC4731] hover:bg-[#b93a29]" : "bg-gray-200 cursor-not-allowed"
            }`}
            disabled={!isFormValid() || loading}
          >
            {loading ? <LoadingIndicator /> : "Agree and continue"}
          </button>
        </div>
      </form>
    </div>
  );
}