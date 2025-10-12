import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateAmenities } from '../../services/apis/amenitiesApi';

export const updateAmenitiesAsync = createAsyncThunk(
  'amenities/update',
  async ({ propertyId, data }, thunkAPI) => {
    try {
      return await updateAmenities(propertyId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const amenitiesSlice = createSlice({
  name: 'amenities',
  initialState: {
    amenities: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetAmenitiesState: (state) => {
      state.amenities = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAmenitiesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAmenitiesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.amenities = action.payload.property.amenities;
      })
      .addCase(updateAmenitiesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAmenitiesState } = amenitiesSlice.actions;
export default amenitiesSlice.reducer;