import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initiateBookingPayment } from '../../services/apis/paymentApi';

export const initiateBookingPaymentAsync = createAsyncThunk(
  'payments/initiateBookingPayment',
  async ({ bookingId, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await initiateBookingPayment(bookingId, paymentMethod);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to initiate payment');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    paymentDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.paymentDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateBookingPaymentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateBookingPaymentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentDetails = action.payload;
      })
      .addCase(initiateBookingPaymentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;