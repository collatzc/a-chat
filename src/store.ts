import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';

interface ChatroomState {
  scope: string;
}

const initialChatroomState: ChatroomState = {
  scope: 'latenightses',
};

const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState: initialChatroomState,
  reducers: {
    setChatroom: (state, action: PayloadAction<string>) => {
      state.scope = action.payload;
    },
  },
});

export const selectChatroomName = (state: RootState) => state.chatroom.scope;

export const store = configureStore({
  reducer: {
    chatroom: chatroomSlice.reducer,
  }
});

type RootState = ReturnType<typeof store.getState>;
