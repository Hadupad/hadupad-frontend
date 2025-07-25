import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { guestUserSignup } from '../../services/apis/guestSignupApi';

export const guestSignup = createAsyncThunk(
  'auth/guestSignup',
  async (data, thunkAPI) => {
    try {
      return await guestUserSignup(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const guestSignupSlice = createSlice({
  name: 'guestSignup',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetGuestSignupState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(guestSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(guestSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(guestSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGuestSignupState } = guestSignupSlice.actions;
export default guestSignupSlice.reducer;