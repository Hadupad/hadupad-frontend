import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { InitiateUser } from '../../services/apis/initiateRegisterApi';

export const initiateRegistration = createAsyncThunk(
  'auth/initiate',
  async ({ phoneNumber, userType }, thunkAPI) => {
    try {
      return await InitiateUser({ phoneNumber, userType });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initiateSlice = createSlice({
  name: 'initiate',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetInitiateState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { userId: action.payload.userId, ...action.payload };
      })
      .addCase(initiateRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetInitiateState } = initiateSlice.actions;
export default initiateSlice.reducer;