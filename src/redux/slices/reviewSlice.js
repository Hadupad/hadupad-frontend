import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProperty, publishListing } from '../../services/apis/reviewApi';
import { setProperty } from './propertySlice';

export const fetchPropertyAsync = createAsyncThunk(
  'review/fetchProperty',
  async (propertyId, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetchProperty(propertyId);
      dispatch(setProperty(response.property));
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const publishListingAsync = createAsyncThunk(
  'review/publish',
  async ({ propertyId, data }, { rejectWithValue }) => {
    try {
      return await publishListing(propertyId, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    resetReviewState: (state) => {
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
      .addCase(fetchPropertyAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchPropertyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(publishListingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishListingAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(publishListingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;