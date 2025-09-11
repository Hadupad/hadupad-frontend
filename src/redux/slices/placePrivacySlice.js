import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateGuestAccommodationType } from '../../services/apis/placePrivacyApi';

export const updatePlacePrivacy = createAsyncThunk(
  'placePrivacy/update',
  async ({ propertyId, data }, thunkAPI) => {
    try {
      return await updateGuestAccommodationType(propertyId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const placePrivacySlice = createSlice({
  name: 'placePrivacy',
  initialState: {
    guestAccommodationType: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPlacePrivacyState: (state) => {
      state.guestAccommodationType = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePlacePrivacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlacePrivacy.fulfilled, (state, action) => {
        state.loading = false;
        state.guestAccommodationType = action.payload.property.guestAccommodationType;
      })
      .addCase(updatePlacePrivacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPlacePrivacyState } = placePrivacySlice.actions;
export default placePrivacySlice.reducer;