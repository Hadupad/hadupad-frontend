import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';

import loginReducer from './slices/loginSlice';
import signupReducer from './slices/signupSlice';
import initiateReducer from './slices/initiateUserSlice';

// Combine all reducers
const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  initiate: initiateReducer,
});

// Config for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Correct middleware setup
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

// Persistor for <PersistGate>
export const persistor = persistStore(store);