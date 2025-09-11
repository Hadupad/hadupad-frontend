import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHostProperties } from '../../services/apis/hostPropertyApi';

export const getHostProperties = createAsyncThunk(
  'properties/getHostProperties',
  async (_, thunkAPI) => {
    try {
      return await fetchHostProperties();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const hostPropertySlice = createSlice({
  name: 'properties',
  initialState: {
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetPropertiesState: (state) => {
      state.properties = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHostProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHostProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(getHostProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPropertiesState } = hostPropertySlice.actions;
export default hostPropertySlice.reducer;