import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updatePricing } from '../../services/apis/pricingApi';

export const updatePricingAsync = createAsyncThunk(
  'pricing/update',
  async ({ propertyId, data }, thunkAPI) => {
    try {
      return await updatePricing(propertyId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const pricingSlice = createSlice({
  name: 'pricing',
  initialState: {
    pricePerNight: null,
    discountPercent: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPricingState: (state) => {
      state.pricePerNight = null;
      state.discountPercent = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePricingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePricingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.pricePerNight = action.payload.property?.pricePerNight || null;
        state.discountPercent = action.payload.property?.discountPercent || null;
      })
      .addCase(updatePricingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPricingState } = pricingSlice.actions;
export default pricingSlice.reducer;