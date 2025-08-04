import { useState } from "react";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { toast } from 'react-toastify';
import LoadingIndicator from "../LoadingIndicator";

export default function SignupForm({ onSignupSuccess, onBack, userType = "guest" }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

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

  const isBirthdateValid = isAdult(formData.birthdate);
  const isPasswordValid = formData.password.length >= 8;

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.includes('@') &&
      isAdult(formData.birthdate) &&
      formData.password.length >= 8
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Signup successful!");
      setLoading(false);
      onSignupSuccess({ ...formData, id: Math.floor(Math.random() * 1000000), userType });
    }, 1200);
  };

  return (
    <div className="p-6 sm:p-0 sm:pb-6">
      {/* Desktop Header */}
      <div className="hidden sm:block p-4 border-b relative text-center">
        <button onClick={onBack} type="button" className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
        </button>
        <h3 className="font-bold">Finish signing up</h3>
      </div>
      <form className="w-full max-w-lg mx-auto bg-white rounded-xl" onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="px-6 pt-2">
          <label className="block mb-1 text-gray-600 text-sm font-medium">First name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-lg font-semibold mb-1 focus:outline-none focus:border-black"
            autoComplete="given-name"
            required
          />
        </div>
        {/* Last Name */}
        <div className="px-6 pt-2">
          <label className="block mb-1 text-gray-600 text-sm font-medium">Last name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-lg font-semibold mb-1 focus:outline-none focus:border-black"
            autoComplete="family-name"
            required
          />
          <p className="text-xs text-gray-500 mb-2">Make sure it matches the name on your government ID.</p>
        </div>
        {/* Birthdate */}
        <div className="px-6 pt-2">
          <label className="block mb-1 text-gray-600 text-sm font-medium">Birthdate</label>
          <div className="relative">
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 text-lg font-semibold mb-1 focus:outline-none focus:border-black pr-10 ${touched.birthdate && !isBirthdateValid ? 'border-red-500' : 'border-gray-200'}`}
              required
            />
          </div>
          {touched.birthdate && !isBirthdateValid ? (
            <p className="text-xs text-red-500 mb-2">You must be at least 18 to sign up.</p>
          ) : (
            <p className="text-xs text-gray-500 mb-2">To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Airbnb.</p>
          )}
        </div>
        {/* Email */}
        <div className="px-6 pt-2">
          <label className="block mb-1 text-gray-600 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-lg font-semibold mb-1 focus:outline-none focus:border-black"
            autoComplete="email"
            required
          />
          <p className="text-xs text-gray-500 mb-2">We’ll email you trip confirmation and receipts.</p>
        </div>
        {/* Password */}
        <div className="px-6 pt-2">
          <label className="block mb-1 text-gray-600 text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 text-lg font-semibold mb-1 focus:outline-none focus:border-black pr-14 ${touched.password && !isPasswordValid ? 'border-red-500' : 'border-gray-200'}`}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {touched.password && !isPasswordValid && (
              <p className="text-xs text-red-500">Password must be at least 8 characters.</p>
          )}
        </div>
        {/* Legal Text */}
        <div className="px-6 pt-2 pb-3">
          <p className="text-xs text-gray-500 mb-2">
            By selecting Agree and continue, I agree to our{' '}
            <a href="#" className="underline">Terms of Service</a>,{' '}
            <a href="#" className="underline">Payments Terms of Service</a> and{' '}
            <a href="#" className="underline">Nondiscrimination Policy</a> and acknowledge the{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white text-base transition ${isFormValid() && !loading ? 'bg-[#DC4731] hover:bg-[#b93a29]' : 'bg-gray-200 cursor-not-allowed'}`}
            disabled={!isFormValid() || loading}
          >
            {loading ? <LoadingIndicator /> : "Agree and continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
