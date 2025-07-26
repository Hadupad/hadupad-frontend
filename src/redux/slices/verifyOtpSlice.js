import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { VerifyOtp } from '../../services/apis/verifyOtpApi';

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({ userId, otp }, thunkAPI) => {
      try {
        return await VerifyOtp({ userId, otp });
      } catch (error) {
        // Pass the full error response or message
        return thunkAPI.rejectWithValue(error.message || 'OTP verification failed');
      }
    }
  );

const verifyOtpSlice = createSlice({
  name: 'verifyOtp',
  initialState: {
    result: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetVerifyOtpState: (state) => {
      state.result = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetVerifyOtpState } = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;