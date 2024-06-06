import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useAuth } from '../../context/AuthContext';

import classes from './Navigation.module.css';

interface Props {
  openLoginModal: () => void;
}

export const Navigation = (props: Props) => {
  const { openLoginModal } = props;

  const { isAuthenticated, removeToken } = useAuth();

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
            {isAuthenticated && (
              <>
                <Navbar.Text className={classes.signedInAsLabel}>Signed in</Navbar.Text>
                <div className={classes.divider} />
                <Nav.Link onClick={removeToken}>log out</Nav.Link>
              </>
            )}
            {!isAuthenticated && <Nav.Link onClick={openLoginModal}>login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
