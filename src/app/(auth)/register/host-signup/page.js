'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { guestSignup, resetGuestSignupState } from "../../../../redux/slices/guestSignupSlice";
import SuccessModal from "../../../../reusable/SuccessModal";

const FinishSignupPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { user: initiateUser, error: initiateError } = useSelector((state) => state.initiate);
  const { loading, error: signupError, user } = useSelector((state) => state.guestSignup);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    minLength: false,
    hasUpperAndLower: false,
    hasNumber: false,
    hasSpecialChar: false,
    containsNameOrEmail: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    dispatch(resetGuestSignupState());
    console.log('Initiate User:', initiateUser);
    return () => {
      dispatch(resetGuestSignupState());
    };
  }, [dispatch, initiateUser]);

  useEffect(() => {
    if (user) {
      setShowSuccessModal(true);
      console.log('Guest Signup User:', user);
    }
  }, [user]);

  useEffect(() => {
    if (signupError) {
      const errorMessage =
        signupError === 'Failed to complete registration: Email already registered'
          ? (
              <div>
                This email is already registered. Please{' '}
                <a href="/login" className="text-[#DC4731] underline hover:text-[#c03d29]">
                  try logging in
                </a>{' '}
                or use a different email.
              </div>
            )
          : getFriendlyErrorMessage(signupError);
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
    }
    if (initiateError) {
      toast.error(getFriendlyErrorMessage(initiateError), {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
    }
  }, [signupError, initiateError]);

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.firstName)) {
      errors.firstName = "First name must be at least 2 characters and contain only letters";
    }
    if (!nameRegex.test(formData.lastName)) {
      errors.lastName = "Last name must be at least 2 characters and contain only letters";
    }
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.birthdate) {
      errors.birthdate = "Birthdate is required";
    } else {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        errors.birthdate = "You must be at least 18 years old";
      }
    }

    const passwordValidation = validatePassword(
      formData.password,
      formData.firstName,
      formData.email
    );
    setPasswordErrors(passwordValidation);

    setFormErrors(errors);
    const isValid =
      Object.keys(errors).length === 0 &&
      Object.values(passwordValidation).every(Boolean);

    setIsFormValid(isValid);
    return isValid;
  };

  const validatePassword = (password, firstName, email) => ({
    minLength: password.length >= 8,
    hasUpperAndLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    containsNameOrEmail:
      firstName && email
        ? !(
            password.toLowerCase().includes(firstName.toLowerCase()) ||
            password.toLowerCase().includes(email.toLowerCase())
          )
        : true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "password" && !passwordTouched && value.length > 0) {
      setPasswordTouched(true);
    }
    validateForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !initiateUser?.userId) {
      if (!initiateUser?.userId) {
        console.error('Missing initiateUser.userId:', initiateUser);
        toast.error('User ID is missing. Please start the registration process again.', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
          bodyClassName: 'flex items-center',
        });
      }
      return;
    }
  
    try {
      const userData = {
        userId: initiateUser.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        birthdate: formData.birthdate,
      };
  
      console.log('Submitting userData:', userData);
      const result = await dispatch(guestSignup(userData)).unwrap();
      console.log('Guest Signup Result:', JSON.stringify(result, null, 2));
  
      const userId = result?.user?.id || user?.id || initiateUser.userId;
  
      if (userId) {
        // Check if userId already exists in localStorage
        const existingUserId = localStorage.getItem('userId');
        if (existingUserId && existingUserId === userId) {
          console.log('UserId already exists in localStorage:', userId);
          toast.info('User ID already saved.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            className: 'bg-blue-500 text-white rounded-lg shadow-lg p-4 font-semibold',
            bodyClassName: 'flex items-center',
          });
        } else if (existingUserId && existingUserId !== userId) {
          console.warn('Different userId found in localStorage:', {
            existing: existingUserId,
            new: userId,
          });
          toast.warn('A different user ID was found. Updating to new ID.', {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            className: 'bg-yellow-500 text-white rounded-lg shadow-lg p-4 font-semibold',
            bodyClassName: 'flex items-center',
          });
          localStorage.setItem('userId', userId);
        } else {
          localStorage.setItem('userId', userId);
          console.log('Saved userId to localStorage:', userId);
          toast.success('User ID saved successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            className: 'bg-green-500 text-white rounded-lg shadow-lg p-4 font-semibold',
            bodyClassName: 'flex items-center',
          });
        }
        console.log('Retrieved userId from localStorage:', localStorage.getItem('userId'));
      } else {
        console.error('No userId found in result or Redux state:', {
          result: JSON.stringify(result, null, 2),
          user: JSON.stringify(user, null, 2),
          initiateUser: JSON.stringify(initiateUser, null, 2),
        });
        toast.error('Failed to retrieve user ID from signup response. Please try again.', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
          bodyClassName: 'flex items-center',
        });
      }
    } catch (err) {
      console.error('Guest signup error:', err);
      toast.error(`Signup failed: ${err.message || 'An error occurred'}`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push("/register/host-profile");
  };

  const getFriendlyErrorMessage = (error) => {
    if (error.includes("Email already registered")) {
      return (
        <div>
          This email is already registered. Please{' '}
          <a href="/login" className="text-[#DC4731] underline hover:text-[#c03d29]">
            try logging in
          </a>{' '}
          or use a different email.
        </div>
      );
    }
    return error || "An error occurred during registration.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        transition={Slide}
      />
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
                className={`w-full border rounded-lg px-4 py-3 text-sm ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="First name"
                required
              />
              {formErrors.firstName && (
                <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>
              )}
            </div>
            <div>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-3 text-sm ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Last name"
                required
              />
              {formErrors.lastName && (
                <p className="text-xs text-red-500 mt-1">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <input
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 text-sm ${formErrors.birthdate ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {formErrors.birthdate ? (
              <p className="text-xs text-red-500 mt-1">{formErrors.birthdate}</p>
            ) : (
              <p className="text-xs text-gray-500 mt-1">
                You must be at least 18 years old to register
              </p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 text-sm ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Email address"
              required
            />
            {formErrors.email && (
              <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 text-sm pr-12 ${passwordTouched && !Object.values(passwordErrors).every(Boolean) ? 'border-red-500' : 'border-gray-300'}`}
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
                <li className={passwordErrors.minLength ? "text-green-600" : "text-red-500"}>
                  • At least 8 characters
                </li>
                <li className={passwordErrors.hasUpperAndLower ? "text-green-600" : "text-red-500"}>
                  • Both uppercase and lowercase letters
                </li>
                <li className={passwordErrors.hasNumber ? "text-green-600" : "text-red-500"}>
                  • At least one number
                </li>
                <li className={passwordErrors.hasSpecialChar ? "text-green-600" : "text-red-500"}>
                  • At least one special character
                </li>
                <li className={passwordErrors.containsNameOrEmail ? "text-green-600" : "text-red-500"}>
                  • Must not contain first name or email
                </li>
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              isFormValid && !loading
                ? "bg-[#DC4731] hover:bg-[#c03d29]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : "Complete Registration"}
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

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleModalClose}
          message="Registration Completed Successfully!"
          useToast={false}
        />
      </div>
    </div>
  );
};

export default FinishSignupPage;