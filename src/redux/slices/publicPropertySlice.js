import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPublicPropertiesApi, fetchPublicPropertyByIdApi } from '../../services/apis/publicPropertyApi';

export const fetchPublicProperties = createAsyncThunk(
  'publicProperty/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await fetchPublicPropertiesApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPublicPropertyById = createAsyncThunk(
  'publicProperty/fetchById',
  async (propertyId, thunkAPI) => {
    try {
      return await fetchPublicPropertyByIdApi(propertyId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const publicPropertySlice = createSlice({
  name: 'publicProperty',
  initialState: {
    properties: [],
    currentProperty: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPublicPropertyState: (state) => {
      state.properties = [];
      state.currentProperty = null;
      state.loading = false;
      state.error = null;
    },
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
        // console.log('Fetching public properties...');
      })
      .addCase(fetchPublicProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        // console.log('Fetched public properties:', action.payload);
      })
      .addCase(fetchPublicProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log('Fetch public properties error:', action.payload);
      })
      .addCase(fetchPublicPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
        // console.log('Fetching property by ID...');
      })
      .addCase(fetchPublicPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProperty = action.payload;
        // console.log('Fetched property by ID:', action.payload);
      })
      .addCase(fetchPublicPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log('Fetch property by ID error:', action.payload);
      });
  },
});

export const { resetPublicPropertyState, clearCurrentProperty } = publicPropertySlice.actions;
export default publicPropertySlice.reducer;

// const publicPropertySlice = createSlice({
//   name: 'publicProperty',
//   initialState: {
//     properties: [],
//     currentProperty: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetPublicPropertyState: (state) => {
//       state.properties = [];
//       state.currentProperty = null;
//       state.loading = false;
//       state.error = null;
//     },
//     clearCurrentProperty: (state) => {
//       state.currentProperty = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPublicProperties.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPublicProperties.fulfilled, (state, action) => {
//         state.loading = false;
//         state.properties = action.payload;
//       })
//       .addCase(fetchPublicProperties.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchPublicPropertyById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPublicPropertyById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentProperty = action.payload;
//       })
//       .addCase(fetchPublicPropertyById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetPublicPropertyState, clearCurrentProperty } = publicPropertySlice.actions;
// export default publicPropertySlice.reducer;