import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchProperties } from '../../services/apis/searchApi';

export const searchPropertiesAsync = createAsyncThunk(
  'search/searchProperties',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await searchProperties(searchParams);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: { count: 0, properties: [] },
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSearchState: (state) => {
      state.results = { count: 0, properties: [] };
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPropertiesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(searchPropertiesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
        state.success = true;
      })
      .addCase(searchPropertiesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSearchState } = searchSlice.actions;
export default searchSlice.reducer;