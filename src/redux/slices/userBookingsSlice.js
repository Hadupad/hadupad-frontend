import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserBookings, cancelBooking, acceptBooking, rejectBooking } from '../../services/apis/userBookingsApi';

export const fetchUserBookingsAsync = createAsyncThunk(
  'userBookings/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await fetchUserBookings();
      console.log('Fetch user bookings API response:', response);
      return response; // Full response { success, count, bookings }
    } catch (error) {
      console.error('Error in fetchUserBookingsAsync:', error.message);
      if (error.message.includes('Invalid token') || error.message.includes('No access token found')) {
        return thunkAPI.rejectWithValue('Please log in again to continue.');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const cancelBookingAsync = createAsyncThunk(
  'userBookings/cancel',
  async ({ id, reason }, thunkAPI) => {
    try {
      const response = await cancelBooking(id, reason);
      console.log('Cancel booking API response:', response);
      return { id, reason }; // Return booking ID and reason to update state
    } catch (error) {
      console.error('Error in cancelBookingAsync:', error.message);
      if (error.message.includes('Invalid token') || error.message.includes('No access token found')) {
        return thunkAPI.rejectWithValue('Please log in again to continue.');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const acceptBookingAsync = createAsyncThunk(
  'userBookings/accept',
  async (id, thunkAPI) => {
    try {
      const response = await acceptBooking(id);
      console.log('Accept booking API response:', response);
      return { id }; // Return booking ID to update state
    } catch (error) {
      console.error('Error in acceptBookingAsync:', error.message);
      if (error.message.includes('Invalid token') || error.message.includes('No access token found')) {
        return thunkAPI.rejectWithValue('Please log in again to continue.');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const rejectBookingAsync = createAsyncThunk(
  'userBookings/reject',
  async ({ id, reason }, thunkAPI) => {
    try {
      const response = await rejectBooking(id, reason);
      console.log('Reject booking API response:', response);
      return { id, reason }; // Return booking ID and reason to update state
    } catch (error) {
      console.error('Error in rejectBookingAsync:', error.message);
      if (error.message.includes('Invalid token') || error.message.includes('No access token found')) {
        return thunkAPI.rejectWithValue('Please log in again to continue.');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userBookingsSlice = createSlice({
  name: 'userBookings',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetUserBookingsState: (state) => {
      state.bookings = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Bookings
      .addCase(fetchUserBookingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookingsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings || [];
        state.error = null;
      })
      .addCase(fetchUserBookingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancel Booking
      .addCase(cancelBookingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { id, reason } = action.payload;
        state.bookings = state.bookings.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                status: 'cancelled',
                cancellationReason: reason,
                cancelledAt: new Date().toISOString(),
              }
            : booking
        );
        state.error = null;
      })
      .addCase(cancelBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Accept Booking
      .addCase(acceptBookingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        state.bookings = state.bookings.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                status: 'upcoming',
              }
            : booking
        );
        state.error = null;
      })
      .addCase(acceptBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reject Booking
      .addCase(rejectBookingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { id, reason } = action.payload;
        state.bookings = state.bookings.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                status: 'cancelled',
                rejectionReason: reason,
                cancelledAt: new Date().toISOString(),
              }
            : booking
        );
        state.error = null;
      })
      .addCase(rejectBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserBookingsState } = userBookingsSlice.actions;
export default userBookingsSlice.reducer;