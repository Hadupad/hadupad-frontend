import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateBookingSettings } from '../../services/apis/bookingSettingsApi';

export const updateBookingSettingsAsync = createAsyncThunk(
  'bookingSettings/update',
  async ({ propertyId, data }, thunkAPI) => {
    try {
      return await updateBookingSettings(propertyId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const bookingSettingsSlice = createSlice({
  name: 'bookingSettings',
  initialState: {
    bookingType: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetBookingSettingsState: (state) => {
      state.bookingType = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBookingSettingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingSettingsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingType = action.payload.property?.bookingType || null;
      })
      .addCase(updateBookingSettingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBookingSettingsState } = bookingSettingsSlice.actions;
export default bookingSettingsSlice.reducer;