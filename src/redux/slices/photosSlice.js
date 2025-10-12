import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadPhotos } from '../../services/apis/photosApi';

export const uploadPhotosAsync = createAsyncThunk(
  'photos/upload',
  async ({ propertyId, data }, thunkAPI) => {
    try {
      return await uploadPhotos(propertyId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetPhotosState: (state) => {
      state.photos = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhotosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPhotosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload.property?.photos || [];
      })
      .addCase(uploadPhotosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPhotosState } = photosSlice.actions;
export default photosSlice.reducer;