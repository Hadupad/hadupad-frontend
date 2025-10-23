// store/slices/conversationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchConversations } from '../../services/apis/conversationApi';

export const fetchConversationsAsync = createAsyncThunk(
  'conversations/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchConversations();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const conversationSlice = createSlice({
  name: 'conversations',
  initialState: {
    conversations: [],
    count: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetConversationState: (state) => {
      state.conversations = [];
      state.count = 0;
      state.totalPages = 1;
      state.currentPage = 1;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload.conversations;
        state.count = action.payload.count;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchConversationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetConversationState } = conversationSlice.actions;
export default conversationSlice.reducer;