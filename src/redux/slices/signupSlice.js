import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signupUser } from '../../services/apis/signupApi';

export const signup = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
  try {
    return await signupUser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default signupSlice.reducer;
