// redux/slices/hostVerificationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { verifyHostIdentity } from '../../services/apis/verifyHostIdentity';

export const verifyHostUserIdentity = createAsyncThunk(
  'hostVerification/verifyHostIdentity',
  async ({ userId, identificationNumber }, { rejectWithValue }) => {
    try {
      return await verifyHostIdentity({ userId, identificationNumber });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const hostVerificationSlice = createSlice({
  name: 'hostVerification',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetHostVerificationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyHostUserIdentity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyHostUserIdentity.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyHostUserIdentity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetHostVerificationState } = hostVerificationSlice.actions;
export default hostVerificationSlice.reducer;