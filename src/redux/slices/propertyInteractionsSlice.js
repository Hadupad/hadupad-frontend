import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitReview, likeProperty } from '../../services/apis/propertyInteractionsApi';

export const submitReviewAsync = createAsyncThunk(
  'propertyInteractions/submitReview',
  async ({ propertyId, review }, { rejectWithValue }) => {
    try {
      const response = await submitReview(propertyId, review);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likePropertyAsync = createAsyncThunk(
  'propertyInteractions/likeProperty',
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await likeProperty(propertyId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const propertyInteractionsSlice = createSlice({
  name: 'propertyInteractions',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetInteractionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReviewAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitReviewAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitReviewAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likePropertyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(likePropertyAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(likePropertyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetInteractionState } = propertyInteractionsSlice.actions;
export default propertyInteractionsSlice.reducer;