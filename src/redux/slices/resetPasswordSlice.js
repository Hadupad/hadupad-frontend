import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resetPasswordApi } from '../../services/apis/resetPasswordApi';

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ resetToken, password }, thunkAPI) => {
    try {
      return await resetPasswordApi({ resetToken, password });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    resetStatus: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetResetPasswordState: (state) => {
      state.resetStatus = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetStatus = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetStatus = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetResetPasswordState } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;