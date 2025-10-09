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
import propertyReducer from './slices/propertySlice';
import placePrivacyReducer from './slices/placePrivacySlice';
import addressReducer from './slices/addressSlice';
import basicDetailsReducer from './slices/basicDetailsSlice';
import amenitiesReducer from './slices/amenitiesSlice';
import photosReducer from './slices/photosSlice';
import titleReducer from './slices/titleSlice';
import bookingSettingsReducer from './slices/bookingSettingsSlice';
import pricingReducer from './slices/pricingSlice';
import propertyDetailsReducer from './slices/propertyDetailsSlice';
import publishReducer from './slices/publishSlice';
import hostPropertyReducer from './slices/hostPropertySlice';
import publicPropertyReducer from './slices/publicPropertySlice';
import wishlistReducer from './slices/wishlistSlice';
import searchReducer from './slices/searchSlice';
import bookingReducer from './slices/bookingSlice';
import userBookingsReducer from './slices/userBookingsSlice';

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
  resetPassword: resetPasswordReducer,
  property: propertyReducer,
  placePrivacy: placePrivacyReducer,
  address: addressReducer,
  basicDetails: basicDetailsReducer,
  amenities: amenitiesReducer,
  photos: photosReducer,
  title: titleReducer,
  bookingSettings: bookingSettingsReducer,
  pricing: pricingReducer,
  propertyDetails: propertyDetailsReducer,
  publish: publishReducer,
  properties: hostPropertyReducer,
  publicProperty: publicPropertyReducer,
  wishlist: wishlistReducer,
  search: searchReducer,
  booking: bookingReducer,
  userBookings: userBookingsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'login',
    'initiate',
    'guestSignup',
    'profilePhoto',
    'hostVerification',
    'profile',
    'property',
    'placePrivacy',
    'address',
    'basicDetails',
    'amenities',
    'photos',
    'title',
    'bookingSettings',
    'pricing',
    'propertyDetails',
    'publish',
    'wishlist',
    'search',
    'booking',
    'userBookings',
  ],
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