import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendPasswordReset } from '../../services/apis/forgotPasswordApi';

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, thunkAPI) => {
    try {
      return await sendPasswordReset(email); // Pass email directly
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    resetStatus: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetForgotPasswordState: (state) => {
      state.resetStatus = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetStatus = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetStatus = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetForgotPasswordState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;