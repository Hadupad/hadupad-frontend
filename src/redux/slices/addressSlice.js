import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updatePropertyAddress } from '../../services/apis/propertyAddressApi';

export const updateAddress = createAsyncThunk(
  'address/update',
  async ({ propertyId, data }, thunkAPI) => {
    try {
      return await updatePropertyAddress(propertyId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    address: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetAddressState: (state) => {
      state.address = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload.property.address;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAddressState } = addressSlice.actions;
export default addressSlice.reducer;