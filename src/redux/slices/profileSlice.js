import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile } from '../../services/apis/profileApi';

export const getUserProfile = createAsyncThunk(
  'profile/getUserProfile',
  async (_, thunkAPI) => {
    try {
      return await fetchUserProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetProfileState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;