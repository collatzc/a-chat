import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const ChatInputBar: React.FC<{}> = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Nav className="justify-content-start">
        <Nav.Item>
          <Nav.Link>Login to send message...</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default ChatInputBar;
