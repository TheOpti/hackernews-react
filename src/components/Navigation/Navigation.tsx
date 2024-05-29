import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface Props {
  openLoginModal: () => void;
}

export const Navigation = (props: Props) => {
  const { openLoginModal } = props;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Hackernews Clone</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">new</Nav.Link>
            <Nav.Link href="#pricing">past</Nav.Link>
            <Nav.Link href="#pricing">comments</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={openLoginModal}>login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
