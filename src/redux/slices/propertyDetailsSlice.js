import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProperty } from '../../services/apis/getPropertyApi';

export const fetchPropertyAsync = createAsyncThunk(
  'propertyDetails/fetch',
  async (propertyId, thunkAPI) => {
    try {
      return await getProperty(propertyId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const propertyDetailsSlice = createSlice({
  name: 'propertyDetails',
  initialState: {
    property: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPropertyDetailsState: (state) => {
      state.property = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload.property || null;
      })
      .addCase(fetchPropertyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPropertyDetailsState } = propertyDetailsSlice.actions;
export default propertyDetailsSlice.reducer;