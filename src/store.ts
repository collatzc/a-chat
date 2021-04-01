import { JsonRpc }from 'eosjs';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';

interface IChatroomState {
  scope: string;
  sender: string;
  messages: MessageRow[];
  refreshIntervalSec: number;
  lastMessageId: number;
  editingMessageId: number;
}

interface MessageRow {
  message_id: number;
  message: string;
  sender: string;
};

const tableName = 'messages';
const rpc = new JsonRpc(`https://wax.pink.gg`);

export const getTableRows = (scope: string, lastId: number) => {
  const _index = lastId === -1 ? 0 : lastId + 1;
  return rpc.get_table_rows({
    json: true,
    code: 'chatexample1',
    scope: scope,
    index_position: 1,
    lower_bound: _index,
    table: tableName,
    limit: 100
  });
};

const initialChatroomState: IChatroomState = {
  scope: 'latenightses',
  sender: '',
  messages: [],
  refreshIntervalSec: 5,
  lastMessageId: -1,
  editingMessageId: -1,
};

const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState: initialChatroomState,
  reducers: {
    setChatroom: (state, action: PayloadAction<string>) => {
      state.scope = action.payload;
      state.lastMessageId = -1;
      state.messages = [];
    },
    setSender: (state, action: PayloadAction<string>) => {
      state.sender = action.payload;
    },
    appendMessages: (state, action: PayloadAction<MessageRow[]>) => {
      state.messages.push(...action.payload);
    },
    clearMessages: (state) => {
      state.lastMessageId = -1;
      state.messages = [];
    },
    setLastMessageId: (state, action: PayloadAction<number>) => {
      state.lastMessageId = action.payload;
    },
    setEditingMessageId: (state, action: PayloadAction<number>) => {
      state.editingMessageId = action.payload;
    },
    setRefreshIntervalSec: (state, action: PayloadAction<number>) => {
      state.refreshIntervalSec = action.payload;
    }
  },
});

export const { setChatroom, setSender, appendMessages, clearMessages, setLastMessageId, setEditingMessageId, setRefreshIntervalSec } = chatroomSlice.actions;

export const store = configureStore({
  reducer: {
    chatroom: chatroomSlice.reducer,
  }
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
