import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nextAction, publishProperty } from '../../services/apis/publishApi';

export const publishPropertyAsync = createAsyncThunk(
  'publish/publishProperty',
  async (propertyId, thunkAPI) => {
    try {
      // Call /next-action endpoint with payload { nextAction: "publish" }
      await nextAction(propertyId);
      // Then call /publish endpoint
      const response = await publishProperty(propertyId);
      return response.message; // Return only the message for the fulfilled case
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const publishSlice = createSlice({
  name: 'publish',
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {
    resetPublishState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPropertyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(publishPropertyAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload; // Store the message
      })
      .addCase(publishPropertyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = null;
      });
  },
});

export const { resetPublishState } = publishSlice.actions;
export default publishSlice.reducer;