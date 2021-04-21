import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';

interface IChatroomState {
  scope: string;
  sender: string;
  messages: MessageRow[];
  refreshIntervalSec: number;
  lastMessageId: number;
  lastActionSeq: number;
  editingMessageId: number;
}

interface MessageRow {
  message_id: number;
  message: string;
  sender: string;
};

type MessageUpdated = {
  messages: MessageRow[];
  lastMessageId: number;
};

const initialChatroomState: IChatroomState = {
  scope: 'latenightses',
  sender: '',
  messages: [],
  refreshIntervalSec: 5,
  lastMessageId: -1,
  lastActionSeq: -1,
  editingMessageId: -1,
};

const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState: initialChatroomState,
  reducers: {
    setChatroom: (state, action: PayloadAction<string>) => {
      state.scope = action.payload;
      state.lastActionSeq = -1;
      state.lastMessageId = -1;
      state.messages = [];
    },
    setSender: (state, action: PayloadAction<string>) => {
      state.sender = action.payload;
    },
    appendMessages: (state, action: PayloadAction<MessageUpdated>) => {
      state.lastMessageId = action.payload.lastMessageId;
      state.messages.push(...action.payload.messages);
    },
    clearMessages: (state) => {
      state.lastActionSeq = -1;
      state.lastMessageId = -1;
      state.messages = [];
    },
    setLastMessageId: (state, action: PayloadAction<number>) => {
      state.lastMessageId = action.payload;
    },
    setLastActionSeq: (state, action: PayloadAction<number>) => {
      state.lastActionSeq = action.payload;
    },
    setEditingMessageId: (state, action: PayloadAction<number>) => {
      state.editingMessageId = action.payload;
    },
    setRefreshIntervalSec: (state, action: PayloadAction<number>) => {
      state.refreshIntervalSec = action.payload;
    }
  },
});

export const { setChatroom, setSender, appendMessages, clearMessages, setLastMessageId, setLastActionSeq, setEditingMessageId, setRefreshIntervalSec } = chatroomSlice.actions;

export const store = configureStore({
  reducer: {
    chatroom: chatroomSlice.reducer,
  }
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
