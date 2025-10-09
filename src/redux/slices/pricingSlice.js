import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updatePricing } from '../../services/apis/pricingApi';

export const updatePricingAsync = createAsyncThunk(
  'pricing/update',
  async ({ propertyId, data }, thunkAPI) => {
    try {
      // Ensure all fields are numbers
      const payload = {
        pricePerNight: Number(data.pricePerNight),
        discountPercent: Number(data.discountPercent),
        serviceFee: Number(data.serviceFee),
        cleaningFee: Number(data.cleaningFee),
        cautionFee: Number(data.cautionFee),
      };
      console.log('Payload sent to updatePricing:', payload); // Debug log
      return await updatePricing(propertyId, payload);
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
    serviceFee: null,
    cleaningFee: null,
    cautionFee: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPricingState: (state) => {
      state.pricePerNight = null;
      state.discountPercent = null;
      state.serviceFee = null;
      state.cleaningFee = null;
      state.cautionFee = null;
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
        state.pricePerNight = Number(action.payload.property?.pricePerNight) || null;
        state.discountPercent = Number(action.payload.property?.discountPercent) || null;
        state.serviceFee = Number(action.payload.property?.serviceFee) || null;
        state.cleaningFee = Number(action.payload.property?.cleaningFee) || null;
        state.cautionFee = Number(action.payload.property?.cautionFee) || null;
      })
      .addCase(updatePricingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPricingState } = pricingSlice.actions;
export default pricingSlice.reducer;