import React from 'react';
import { Navbar, Nav, Form, Col, Modal, Button } from 'react-bootstrap';
import { setChatroom, setRefreshIntervalSec, useAppSelector, useAppDispatch } from 'src/store';
import logo from 'src/assets/loading.gif';

type Props = {
  version: string;
};

const Navbar_: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const _scope = useAppSelector(state => state.chatroom.scope);
  const _refreshSec = useAppSelector(state => state.chatroom.refreshIntervalSec);
  const [chatroomName, setChatroomName] = React.useState(_scope);
  const [refreshSec, setRefreshSec] = React.useState(_refreshSec);
  const [showSettings, setShowSettings] = React.useState(false);

  const handleShowSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);

  const handleChatroomNameChange = (event: any) => {
    setChatroomName(event.currentTarget.value);
  }
  const handleChatroomNameUpdate = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (chatroomName.length !== 12) {
      return;
    }
    dispatch(setChatroom(chatroomName));
  }

  const handleRefreshSecChange = (event: any) => {
    setRefreshSec(Number(event.currentTarget.value));
  }
  const handleRefreshSecUpdate = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(setRefreshIntervalSec(refreshSec));
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#">
          <img
            alt="A-Chat"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          A-Chat
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link onClick={handleShowSettings}>Settings</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={showSettings} onHide={handleCloseSettings}>
        <Modal.Header closeButton>
          <Modal.Title>A-Chat v{props.version}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>About</h5>
            <p>Just a demo and the verion is only {props.version}.</p>
          </div>
          <div>
            <h5>Chatroom</h5>
            <Form onSubmit={handleChatroomNameUpdate}>
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Form.Control
                    value={chatroomName}
                    onChange={handleChatroomNameChange}
                    className="mb-2"
                    placeholder="Chatroom name"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="button" className="mb-2" onClick={handleChatroomNameUpdate}>
                    Update
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </div>
          <div>
            <h5>Refresh Interval(seconds)</h5>
            <Form onSubmit={handleRefreshSecUpdate}>
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Form.Control
                    type="number"
                    value={refreshSec}
                    onChange={handleRefreshSecChange}
                    className="mb-2"
                    placeholder="Refresh in seconds"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="button" className="mb-2" onClick={handleRefreshSecUpdate}>
                    Update
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseSettings}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navbar_;
