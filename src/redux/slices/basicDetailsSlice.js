import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateBasicDetails } from '../../services/apis/basicDetailsApi';

export const updateBasicDetailsAsync = createAsyncThunk(
  'basicDetails/update',
  async ({ propertyId, data }, thunkAPI) => {
    try {
      return await updateBasicDetails(propertyId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const basicDetailsSlice = createSlice({
  name: 'basicDetails',
  initialState: {
    basicDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetBasicDetailsState: (state) => {
      state.basicDetails = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBasicDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBasicDetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.basicDetails = action.payload.property.basicDetails;
      })
      .addCase(updateBasicDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBasicDetailsState } = basicDetailsSlice.actions;
export default basicDetailsSlice.reducer;