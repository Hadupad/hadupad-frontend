// store/slices/conversationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchConversation } from '../../services/apis/fetchConversationApi';

export const fetchConversationAsync = createAsyncThunk(
  'conversations/fetchOne',
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await fetchConversation(conversationId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    currentConversation: null,
    conversations: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentConversation: (state) => {
      state.currentConversation = null;
      state.loading = false;
      state.error = null;
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConversation = action.payload; // { conversation, messages, count, totalPages, currentPage }
      })
      .addCase(fetchConversationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentConversation = null;
      });
  },
});

export const { clearCurrentConversation, setCurrentConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;