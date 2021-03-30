import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectChatroomName } from 'src/store';
import MessageBubble from './MessageBubble';
import { useFetch } from 'src/hooks';
import './MessageBubble.scss';

type Props = {
};

type MessageRow = {
  message_id: number;
  message: string;
  sender: string;
};

interface MessageRows {
  rows: MessageRow[]
}

const ChatContainer: React.FC<Props> = () => {
  const _scope = useSelector(selectChatroomName);
  const reqHeaders = new Headers();
  reqHeaders.append('Content-Type', 'application/json');
  const rawData = JSON.stringify({
    "json": true,
    "code": "chatexample1",
    "scope": _scope,
    "table": "messages",
    "table_key": "",
    "lower_bound": null,
    "upper_bound": null,
    "index_position": 1,
    "key_type": "",
    "limit": "100",
    "reverse": false,
    "show_payer": false
  });
  const resp = useFetch<MessageRows>('https://wax.pink.gg/v1/chain/get_table_rows', {
    method: 'POST',
    headers: reqHeaders,
    body: rawData
  });
  if (resp.error) {
    console.log(resp.error);
  }
  return (
    <Container fluid style={{ marginTop: 60 }}>
      { (resp.status === 'init')  &&
        <Alert>Loading...</Alert>
      }
      { resp.data?.rows.map((msg: MessageRow) => (
          <MessageBubble key={msg.message_id} text={msg.message} sender={msg.sender} alignment="left" />
        ))
      }
    </Container>
  );
}

export default ChatContainer;
