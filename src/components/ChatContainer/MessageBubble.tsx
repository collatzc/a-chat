import React from 'react';

type Props = {
  text: string;
  sender: string;
  alignment: "left" | "right";
};

const MessageBubble: React.FC<Props> = (props) => {
  return (
    <div className={"bubble "+props.alignment} data-sender={props.sender}>
      <span className={props.alignment}>{props.text}</span>
    </div>
  );
}

export default MessageBubble;
