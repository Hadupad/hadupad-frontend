import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateTitle } from '../../services/apis/titleApi';

export const updateTitleAsync = createAsyncThunk(
  'title/update',
  async ({ propertyId, data }, thunkAPI) => {
    try {
      return await updateTitle(propertyId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const titleSlice = createSlice({
  name: 'title',
  initialState: {
    title: null,
    description: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetTitleState: (state) => {
      state.title = null;
      state.description = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTitleAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTitleAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.title = action.payload.property?.title || null;
        state.description = action.payload.property?.description || null;
      })
      .addCase(updateTitleAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTitleState } = titleSlice.actions;
export default titleSlice.reducer;