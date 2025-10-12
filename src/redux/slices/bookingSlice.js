import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBooking } from '../../services/apis/bookingApi';

export const createBookingAsync = createAsyncThunk(
  'booking/create',
  async ({ propertyId, bookingData }, thunkAPI) => {
    try {
      const payload = {
        propertyId,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        guestCount: Number(bookingData.guestCount),
        subtotal: Number(bookingData.subtotal),
        cleaningFee: Number(bookingData.cleaningFee),
        serviceFee: Number(bookingData.serviceFee),
        cautionFee: Number(bookingData.cautionFee),
        discountAmount: Number(bookingData.discountAmount),
        totalAmount: Number(bookingData.totalAmount),
        specialRequests: bookingData.specialRequests || '',
      };
      console.log('Payload prepared in createBookingAsync:', payload);
      const response = await createBooking(propertyId, payload);
      console.log('API response:', response);
      return response; // Full response { success, message, booking }
    } catch (error) {
      console.error('Error in createBookingAsync:', error.message);
      if (error.message.includes('Invalid token') || error.message.includes('No access token found')) {
        return thunkAPI.rejectWithValue('Please log in again to continue.');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    booking: null, // Full booking object
    bookingId: null, // Alias for easy access
    loading: false,
    error: null,
  },
  reducers: {
    resetBookingState: (state) => {
      state.booking = null;
      state.bookingId = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBookingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload.booking; // Full booking object
        state.bookingId = action.payload.booking?.id; // Alias
        state.error = null;
      })
      .addCase(createBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;