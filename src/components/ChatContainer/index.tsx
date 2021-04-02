import React from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector, useAppDispatch, appendMessages, setLastMessageId, getTableRows } from 'src/store';
import MessageBubble from './MessageBubble';
import './MessageBubble.scss';

type MessageRow = {
  message_id: number;
  message: string;
  sender: string;
};

const ChatContainer: React.FC<{}> = () => {
  const [conter, setCounter] = React.useState(0);
  const _scope = useAppSelector(state => state.chatroom.scope);
  const _sender = useAppSelector(state => state.chatroom.sender);
  const _lastMessageId = useAppSelector(state => state.chatroom.lastMessageId);
  const _refreshSec = useAppSelector(state => state.chatroom.refreshIntervalSec);
  const _messages = useAppSelector(state => state.chatroom.messages);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    getTableRows(_scope, _lastMessageId).then(resp => {
      if (resp.rows.length === 0) return;
      const lastId = resp.rows[resp.rows.length-1].message_id;
      if (lastId > _lastMessageId) {
        dispatch(setLastMessageId(lastId));
        dispatch(appendMessages(resp.rows));
      }
    });

    const timer = setInterval(() => {
      setCounter(conter + 1);
    }, _refreshSec*1000);

    return () => clearInterval(timer);
  });

  return (
    <Container fluid style={{ marginTop: 60, marginBottom: 60 }}>
      { _messages.map((msg: MessageRow) => (
        <MessageBubble key={msg.message_id} messageId={msg.message_id} text={msg.message} sender={msg.sender} alignment={msg.sender === _sender ? 'right': 'left'} />
        ))
      }
    </Container>
  );
}

export default ChatContainer;
