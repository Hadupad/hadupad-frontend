import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import loginReducer from './slices/loginSlice';
import signupReducer from './slices/signupSlice';
import initiateReducer from './slices/initiateUserSlice';
import verifyOtpReducer from './slices/verifyOtpSlice';
import guestSignupReducer from './slices/guestSignupSlice';
import profilePhotoReducer from './slices/profilePhotoSlice';
import hostVerificationReducer from './slices/hostVerificationSlice';
import profileReducer from './slices/profileSlice';
import forgotPasswordReducer from './slices/forgotPasswordSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  initiate: initiateReducer,
  verifyOtp: verifyOtpReducer,
  guestSignup: guestSignupReducer,
  profilePhoto: profilePhotoReducer,
  hostVerification: hostVerificationReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer 
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'initiate', 'guestSignup', 'profilePhoto', 'hostVerification', 'profile'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);