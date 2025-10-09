import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWishlist } from '../../services/apis/wishlistApi';

export const fetchWishlistAsync = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWishlist();
      console.log('fetchWishlist response:', response);
      return response;
    } catch (error) {
      console.error('fetchWishlistAsync error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  properties: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearWishlist: (state) => {
      state.properties = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;