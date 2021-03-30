import React from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import logo from 'src/assets/loading.gif';

type Props = {
  version: string;
};

const Navbar_: React.FC<Props> = (props) => {
  const [showSettings, setShowSettings] = React.useState(false);

  const handleShowSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);

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
