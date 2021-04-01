import React from 'react';
import { Button } from 'react-bootstrap';
import { setEditingMessageId, useAppDispatch } from 'src/store';

type Props = {
  messageId: number;
  text: string;
  sender: string;
  alignment: "left" | "right";
};

const MessageBubble: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const handleEdit = (event: any) => {
    dispatch(setEditingMessageId(Number(event.currentTarget.dataset.id)));
  };

  return (
    <div className={"bubble "+props.alignment} data-sender={props.sender}>
      <span className={props.alignment}>{props.text}</span>
      {
        props.alignment === 'right' &&
          <Button
            variant="primary"
            size="sm"
            data-id={props.messageId}
            onClick={handleEdit}
            style={{ padding: '.2em .2em', fontSize: '.6em', height: '1.9em' }}
          >
            Edit
          </Button>
      }
    </div>
  );
}

export default MessageBubble;
