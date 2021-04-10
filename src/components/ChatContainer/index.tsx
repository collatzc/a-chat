import React from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector, useAppDispatch, appendMessages, clearMessages, setLastActionSeq } from 'src/store';
import { getTableRows, getActions } from 'src/api';
import MessageBubble from './MessageBubble';
import './MessageBubble.scss';

type MessageRow = {
  message_id: number;
  message: string;
  sender: string;
};

const ChatContainer: React.FC = () => {
  const [counter, setCounter] = React.useState(0);
  const _scope = useAppSelector(state => state.chatroom.scope);
  const _sender = useAppSelector(state => state.chatroom.sender);
  const _lastMessageId = useAppSelector(state => state.chatroom.lastMessageId);
  const _lastActionSeq = useAppSelector(state => state.chatroom.lastActionSeq);
  const _refreshSec = useAppSelector(state => state.chatroom.refreshIntervalSec);
  const _messages = useAppSelector(state => state.chatroom.messages);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    getActions(-1).then(resp => {
      const currentSeq = resp.actions[0].account_action_seq;
      if (currentSeq > _lastActionSeq) {
        if (_lastActionSeq !== -1 && resp.actions[0].action_trace.act.name === 'editmessage') {
          dispatch(clearMessages());
        }
        getTableRows(_scope, _lastMessageId).then(resp => {
          if (!resp.more) {
            dispatch(setLastActionSeq(currentSeq));
          }
          if (resp.rows.length === 0) return;
          const lastId = resp.rows[resp.rows.length-1].message_id;
          if (lastId > _lastMessageId) {
            dispatch(appendMessages({messages: resp.rows, lastMessageId: lastId}));
            window.scrollBy({
              top: document.body.offsetHeight,
              behavior: 'smooth'
            });
          }
        });
      }
    });

    const timer = setInterval(() => {
      setCounter(counter + 1);
    }, _refreshSec*1000);

    return () => clearInterval(timer);
  }, [counter, _lastActionSeq]);

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
