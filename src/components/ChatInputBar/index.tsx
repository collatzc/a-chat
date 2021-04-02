import React from 'react';
import { Navbar, Nav, NavDropdown, Badge, Form, FormControl, Button, Spinner, Modal, Col } from 'react-bootstrap';
import { UALProps, withUAL } from 'ual-reactjs-renderer';
import { setSender, setEditingMessageId, clearMessages, useAppSelector, useAppDispatch } from 'src/store';
import anchorLogo from 'src/assets/anchor.svg';

const ChatInputBar: React.FC<UALProps> = (props) => {
  const _sender = useAppSelector(state => state.chatroom.sender);
  const _chatroomName = useAppSelector(state => state.chatroom.scope);
  const _editingMessageId = useAppSelector(state => state.chatroom.editingMessageId);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = React.useState(false);
  const [iptMessage, setIptMessage] = React.useState('');
  const [iptNewMessage, setIptNewMessage] = React.useState('');
  const [editingId, setEditingId] = React.useState(_editingMessageId);

  const handleLogin = () => {
    props.ual.showModal();
  };

  const handleLogout = () => {
    props.ual.logout();
  };

  const handleMessageChange = (event: any) => {
    setIptMessage(event.currentTarget.value);
  }

  const handleSend = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const { ual: { activeUser } } = props;
    if (activeUser && iptMessage !== '') {
      setLoading(true);
      try {
        await activeUser.signTransaction({
          actions: [
            {
              account: 'chatexample1',
              name: 'sendmessage',
              authorization: [{ actor: activeUser.accountName, permission: activeUser.requestPermission }],
              data: {
                chatroom: _chatroomName,
                message: iptMessage,
                sender: activeUser.accountName,
              }
            }
          ]
        }, { expireSeconds: 120, blocksBehind: 3 });
        setIptMessage('');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleNewMessageChange = (event: any) => {
    setIptNewMessage(event.currentTarget.value);
  }

  const handleSubmitEditing = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const { ual: { activeUser } } = props;
    if (activeUser && iptNewMessage !== '') {
      setLoading(true);
      try {
        await activeUser.signTransaction({
          actions: [
            {
              account: 'chatexample1',
              name: 'editmessage',
              authorization: [{ actor: activeUser.accountName, permission: activeUser.requestPermission }],
              data: {
                chatroom: _chatroomName,
                new_message: iptNewMessage,
                message_id: editingId,
              }
            }
          ]
        }, { expireSeconds: 120, blocksBehind: 3 });

        setIptNewMessage('');
        setEditingId(-1);
        dispatch(clearMessages());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseEditing = () => {
    setEditingId(-1);
  };

  const { ual } = props;
  React.useEffect(() => {
    if (ual.activeUser && ual.activeUser.accountName !== _sender) {
      dispatch(setSender(ual.activeUser.accountName));
    }
    if (_editingMessageId !== -1) {
      setEditingId(_editingMessageId);
      dispatch(setEditingMessageId(-1));
    }

    return () => {};
  }, [dispatch, ual, _sender, _editingMessageId]);

  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Nav className="justify-content-start" style={{ width: '100%' }}>
        { ual.activeUser != null ?
          <>
            <Navbar.Brand className="d-none d-lg-block">
              <img src={anchorLogo} alt="anchor logo" width="15" height="15" />
            </Navbar.Brand>
            <NavDropdown title={`${ual.activeUser.accountName} (${ual.activeUser.requestPermission})`} id="activeUserMenu" drop="up" className="d-none d-lg-block">
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<img src={anchorLogo} alt="anchor logo" width="15" height="15" />}
              id="activeUserMenu"
              drop="up"
              className="d-lg-none"
            >
              <Navbar.Text style={{ color: '#000', marginLeft: '1.5rem' }}>{`${ual.activeUser.accountName} (${ual.activeUser.requestPermission})`}</Navbar.Text>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Form inline style={{ flex: 1 }} onSubmit={handleSend}>
              <FormControl
                required
                disabled={loading}
                readOnly={loading}
                value={iptMessage}
                onChange={handleMessageChange}
                type="text" placeholder="Message..." className="mr-2" style={{ flex: 1 }} />
              <Button
                disabled={loading}
                variant="primary"
                onClick={handleSend}
              >
                { loading ?
                  <Spinner
                  as="span"
                  animation="border"
                  className="mr-sm-2"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  /> : 'Send'
                }
              </Button>
            </Form>
            <Modal show={editingId !== -1} onHide={handleCloseEditing}>
              <Modal.Header closeButton>
                <Modal.Title>Editing Message</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmitEditing}>
                  <Form.Row className="align-items-center">
                    <Col xs="auto">
                      <h3><Badge variant="primary">{editingId}</Badge></h3>
                    </Col>
                    <Col xs="auto">
                      <Form.Control
                        readOnly={loading}
                        value={iptNewMessage}
                        onChange={handleNewMessageChange}
                        placeholder="New message..."
                      />
                    </Col>
                  </Form.Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button disabled={loading} variant="primary" onClick={handleSubmitEditing}>
                  { loading ?
                    <Spinner
                    as="span"
                    animation="border"
                    className="mr-sm-2"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    /> : 'Submit'
                  }
                </Button>
              </Modal.Footer>
            </Modal>
          </>
          :
          <Nav.Item>
            <Nav.Link onClick={handleLogin}>Login to send message...</Nav.Link>
          </Nav.Item>
        }
      </Nav>
    </Navbar>
  );
}

export default withUAL(ChatInputBar);
