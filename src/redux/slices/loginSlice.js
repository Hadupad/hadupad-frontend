import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin } from '../../services/apis/loginApi';

export const login = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      return await userLogin(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetLoginState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;