import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadProfilePhotoApi } from '../../services/apis/uploadProfilePhotoApi';

export const uploadProfilePhoto = createAsyncThunk(
    'profilePhoto/uploadProfilePhoto',
    async ({ userId, image }, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append('profilePicture', image); 
        return await uploadProfilePhotoApi({ userId, formData });
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const profilePhotoSlice = createSlice({
  name: 'profilePhoto',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetProfilePhotoState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(uploadProfilePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProfilePhotoState } = profilePhotoSlice.actions;
export default profilePhotoSlice.reducer;