import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProperty } from '../../services/apis/propertyApi';

export const createNewProperty = createAsyncThunk(
  'property/create',
  async (data, thunkAPI) => {
    try {
      return await createProperty(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    property: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPropertyState: (state) => {
      state.property = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload.property; // Store the entire property object
      })
      .addCase(createNewProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPropertyState } = propertySlice.actions;
export default propertySlice.reducer;